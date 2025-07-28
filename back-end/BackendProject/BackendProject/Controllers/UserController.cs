using BackendProject.Data;
using BackendProject.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace BackendProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

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

            // Generate JWT token
            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Name, user.username)
        }),
                Expires = login.RememberMe ? DateTime.UtcNow.AddDays(7) : DateTime.UtcNow.AddHours(1),
                Issuer = "https://localhost:5057",
                Audience = "https://localhost:5057",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            // Return the token as JSON
            return Ok(new { token = jwtToken });
        }


        [HttpPost("register")]
        public IActionResult Register([FromBody] User newUser)
        {
            // Check if username already exists
            var existing = _context.Users.FirstOrDefault(u => u.username == newUser.username);
            if (existing != null)
                return BadRequest("Username already exists.");

            // Hash the password and set creation time
            newUser.password = _passwordHasher.HashPassword(newUser, newUser.password);
            newUser.CreatedAt = DateTime.UtcNow;

            // Add and save user
            _context.Users.Add(newUser);
            _context.SaveChanges();

            // Generate JWT token (same way as in Login)
            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
            new Claim(ClaimTypes.Name, newUser.username)
        }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = "https://localhost:5057",
                Audience = "https://localhost:5057",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            // Return JSON with the token for frontend to store
            return Ok(new { token = jwtToken });
        }

    }
}
