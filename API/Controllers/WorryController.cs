using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorryController : ControllerBase
    {
        private readonly WorryService _worryService;

        public WorryController(WorryService worryService)
        {
            _worryService = worryService;
        }

        [HttpGet]
        public async Task<List<Worry>> Get() => await _worryService.GetWorryAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Worry>> Get(string id) => await _worryService.GetWorryAsync(id);


        [HttpPost]
        public async Task<IActionResult> Create(Worry newWorry)
        {
            await _worryService.CreateAsync(newWorry);

            return Ok();
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Worry updatedWorry)
        {
            var worry = await _worryService.GetWorryAsync(id);

            if (worry == null)
            {
                return NotFound();
            }

            updatedWorry.Id = worry.Id;

            await _worryService.UpdateAsync(id, updatedWorry);

            return Ok();
        }



        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var worry = await _worryService.GetWorryAsync(id);

            if (worry == null)
            {
                return NotFound();
            }

            await _worryService.DeleteAsync(id);

            return Ok();
        }
    
}
}
