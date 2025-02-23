using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BooksController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("house/{houseId}")]
    public async Task<IActionResult> GetBooks(int houseId)
    {
        try
        {
            var books = await _context.Books
                .Where(b => b.HouseID == houseId)
                .ToListAsync();
            
            return Ok(books);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetCommunicationBook(
        [FromQuery] string houseAddress,
        [FromQuery] int year,
        [FromQuery] int month,
        [FromQuery] int day)
    {
        try
        {
            var house = await _context.Houses
                .FirstOrDefaultAsync(h => h.Address == houseAddress);

            if (house == null)
                return NotFound("House not found");

            var book = await _context.Books
                .FirstOrDefaultAsync(b => 
                    b.HouseID == house.ID &&
                    b.Year == year &&
                    b.Month == month &&
                    b.Day == day);

            return book != null ? Ok(book) : NotFound();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
