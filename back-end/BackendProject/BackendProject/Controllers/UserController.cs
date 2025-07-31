using BackendProject.Data;
using BackendProject.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using System.Collections.Concurrent;

namespace BackendProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        private static ConcurrentDictionary<string, string> RefreshTokens = new();

        public UserController(AppDBContext context, IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest login)
        {
            var user = _context.Users.FirstOrDefault(u => u.username == login.username);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            var result = _passwordHasher.VerifyHashedPassword(user, user.password, login.password);
            if (result == PasswordVerificationResult.Failed)
                return Unauthorized("Invalid username or password.");

            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]);
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.username) }),
                Expires = login.RememberMe ? DateTime.UtcNow.AddDays(7) : DateTime.UtcNow.AddHours(1),
                Issuer = "https://localhost:5057",
                Audience = "https://localhost:5057",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var accessToken = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(accessToken);

            var refreshToken = GenerateRefreshToken();

            RefreshTokens.AddOrUpdate(user.username, refreshToken, (k, v) => refreshToken);

            return Ok(new
            {
                token = jwtToken,
                refreshToken = refreshToken
            });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User newUser)
        {
            var existing = _context.Users.FirstOrDefault(u => u.username == newUser.username);
            if (existing != null)
                return BadRequest("Username already exists.");

            newUser.password = _passwordHasher.HashPassword(newUser, newUser.password);
            newUser.CreatedAt = DateTime.UtcNow;

            _context.Users.Add(newUser);
            _context.SaveChanges();

            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, newUser.username) }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = "https://localhost:5057",
                Audience = "https://localhost:5057",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return Ok(new { token = jwtToken });
        }

        [HttpPost("refresh-token")]
        public IActionResult RefreshToken([FromBody] TokenApiModel tokenApiModel)
        {
            if (tokenApiModel is null)
                return BadRequest("Invalid request");

            var accessToken = tokenApiModel.AccessToken;
            var refreshToken = tokenApiModel.RefreshToken;

            var principal = GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
                return BadRequest("Invalid access token or refresh token");

            var username = principal.Identity.Name;

            if (!RefreshTokens.TryGetValue(username, out var savedRefreshToken) || savedRefreshToken != refreshToken)
                return BadRequest("Invalid refresh token");

            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]);
            var tokenHandler = new JwtSecurityTokenHandler();

            var newTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = "https://localhost:5057",
                Audience = "https://localhost:5057",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var newAccessToken = tokenHandler.CreateToken(newTokenDescriptor);
            var newJwtToken = tokenHandler.WriteToken(newAccessToken);

            var newRefreshToken = GenerateRefreshToken();

            RefreshTokens[username] = newRefreshToken;

            return Ok(new
            {
                token = newJwtToken,
                refreshToken = newRefreshToken
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout([FromBody] TokenApiModel tokenApiModel)
        {
            if (tokenApiModel is null)
                return BadRequest("Invalid request");

            var principal = GetPrincipalFromExpiredToken(tokenApiModel.AccessToken);
            if (principal == null)
                return BadRequest("Invalid token");

            var username = principal.Identity.Name;

            RefreshTokens.TryRemove(username, out _);

            return Ok("Logged out successfully");
        }
        private string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidIssuer = "https://localhost:5057",
                ValidAudience = "https://localhost:5057",
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
                if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                    !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, System.StringComparison.InvariantCultureIgnoreCase))
                {
                    return null;
                }
                return principal;
            }
            catch
            {
                return null;
            }
        }
    }

    public class TokenApiModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
