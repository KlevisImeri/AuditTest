using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Route("api/[controller]")]
public class EntriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EntriesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetEntries(
        [FromQuery] int houseId,
        [FromQuery] int? year,
        [FromQuery] int? month,
        [FromQuery] int? day)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var user = await _context.Users.FindAsync(int.Parse(userId));
            if (user == null) return NotFound("User not found");

            if (user.HouseID != -1)
            {
                houseId = user.HouseID;
            }

            if (user.TodayOnly)
            {
                var today = DateTime.Today;
                year = today.Year;
                month = today.Month;
                day = today.Day;
            }

            var houseExists = await _context.Houses.AnyAsync(h => h.ID == houseId);
            if (!houseExists)
            {
                return NotFound("House not found");
            }

            var query = _context.Entries.Where(e => e.HouseID == houseId);

            // Apply other filters and return
            if (year.HasValue) query = query.Where(e => e.Year == year);
            if (month.HasValue) query = query.Where(e => e.Month == month);
            if (day.HasValue) query = query.Where(e => e.Day == day);

            var results = await query.ToListAsync();
            return Ok(results);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("UpdateEntries")]
    public async Task<IActionResult> UpdateEntries([FromBody] List<UpdateEntry> entries)
    {

        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var user = await _context.Users.FindAsync(int.Parse(userId));
            if (user == null)
                return NotFound("User not found");

            foreach (var entry in entries)
            {
                if (user.HouseID != -1 && user.HouseID != entry.HouseID)
                {
                    return Forbid("You are not allowed to update entries for this house.");
                }

                var existingEntry = await _context.Entries.FindAsync(entry.ID);
                if (existingEntry != null)
                {
                    _context.Entry(existingEntry).CurrentValues.SetValues(entry);
                }
                else
                {
                  var newEntry = new Entry
                  {
                      HouseID = entry.HouseID,
                      Year = entry.Year,
                      Month = entry.Month,
                      Day = entry.Day,
                      HouseNumber = entry.HouseNumber,
                      RoomNumber = entry.RoomNumber,
                      RepairDescription = entry.RepairDescription,
                      NoticedDate = entry.NoticedDate,
                      CompletedDate = entry.CompletedDate,
                      EmergencyStartTime = entry.EmergencyStartTime,
                      TravelInfo = entry.TravelInfo,
                      FeedbackToOffice = entry.FeedbackToOffice
                  };
                  _context.Entries.Add(newEntry);
                }
            }

            await _context.SaveChangesAsync();
            return Ok(entries);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteEntries([FromQuery] int[] ids)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(int.Parse(userId));
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (ids == null || ids.Length == 0)
            {
                return BadRequest("No entry IDs provided");
            }

            var entriesToDelete = new List<Entry>();
            foreach (var id in ids)
            {
                var entry = await _context.Entries.FindAsync(id);
                if (entry == null)
                {
                    return NotFound($"Entry with ID {id} not found");
                }

                if (user.HouseID != -1 && user.HouseID != entry.HouseID)
                {
                    return Forbid("You are not allowed to delete entries for this house.");
                }

                entriesToDelete.Add(entry);
            }

            _context.Entries.RemoveRange(entriesToDelete);
            await _context.SaveChangesAsync();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
