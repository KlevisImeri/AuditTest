using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetHouseById(int id)
    {
        try
        {
            var house = await _context.Houses.FindAsync(id);
            if (house == null)
            {
                return NotFound($"House with ID {id} not found.");
            }
            return Ok(house);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
