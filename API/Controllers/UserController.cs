using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

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
                var token = new JwtSecurityToken(
                    expires: DateTime.UtcNow.AddDays(2)
                );
                var newToken = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new {Token = newToken});
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
