using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<List<User>> Get() => await _userService.GetUserAsync();

        [Authorize]
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> Get(string id) => await _userService.GetUserByIdAsync(id);

        [HttpGet("{username:minlength(8)}")] // Updated route to allow any username over 8 characters
        public async Task<ActionResult<User>> GetByUsername(string username) => await _userService.GetUserByUsernameAsync(username);

        [HttpPost]
        public async Task<IActionResult> Create(User newUser)
        {
            await _userService.CreateAsync(newUser);

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(User newUser)
        {
            var user = await _userService.GetUserByUsernameAsync(newUser.username);
            if (user != null && user.password == newUser.password)
            {
                // Create a list of claims
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id), // Assuming 'Id' is a property of your User model
            new Claim(ClaimTypes.Name, user.username)
        };

                // Create a new JWT token
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddDays(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("9F86D081884C7D659A2FEAA0C55AD015A3BF4F1AD2F14898B95B926B7A20745E")), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var newToken = tokenHandler.WriteToken(token);

                return Ok(new { Token = newToken });
            }

            return Unauthorized();
        }


        [Authorize]
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, User updatedUser)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user.Id != updatedUser.Id)
            {
                return Forbid(); // Or return a custom message indicating the user can't update other users' data
            }

            if (user == null)
            {
                return NotFound();
            }

            updatedUser.Id = user.Id;

            await _userService.UpdateAsync(id, updatedUser);

            return Ok();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            await _userService.DeleteAsync(id);

            return Ok();
        }
    }
}
