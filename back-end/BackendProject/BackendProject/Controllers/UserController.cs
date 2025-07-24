using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using BackendProject.Data;
using BackendProject.Models;
using System.Linq;

namespace BackendProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserController(AppDBContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var user = _context.Users.FirstOrDefault(u => u.username == login.username);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            var result = _passwordHasher.VerifyHashedPassword(user, user.password, login.password);
            if (result == PasswordVerificationResult.Failed)
                return Unauthorized("Invalid username or password.");

            return Ok("Login successful.");
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

            return Ok("User registered successfully.");
        }
    }
}
