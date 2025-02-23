using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class HousesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HousesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetHouses()
    {
        try
        {
            var houses = await _context.Houses.ToListAsync();
            return Ok(houses);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
