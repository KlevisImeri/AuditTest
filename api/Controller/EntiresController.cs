using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class EntriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EntriesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("book/{bookId}")]
    public async Task<IActionResult> GetEntries(int bookId)
    {
        try
        {
            var entries = await _context.Entries
                .Where(e => e.BookID == bookId)
                .ToListAsync();
            
            return Ok(entries);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
