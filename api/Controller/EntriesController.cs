using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/Entries")]
public class LocalEntriesController : ControllerBase {
  private readonly ApplicationDbContext db;
  private readonly LocalAccessControl auth;
  private readonly ILogger<LocalEntriesController> log;

  public LocalEntriesController(
    ApplicationDbContext context,
    LocalAccessControl authentication,
    ILogger<LocalEntriesController> logger
  ) {
    db = context;
    auth = authentication;
    log = logger;
  }
  
  [HttpGet]
  public async Task<IActionResult> GetEntries(
    [FromQuery] int houseId,
    [FromQuery] int? year,
    [FromQuery] int? month,
    [FromQuery] int? day,
    [FromQuery] Entry.EntryType? type
  ){
    var (user, error) = await auth.AuthorizeAsync(
      SignUpPrivilage: false,
      houseID: houseId
    );
    if (error != null) return error;

    if (user!.TodayOnly) { //Somehow should be put in AuthorizeAsync
      var today = DateTime.Today;
      year = today.Year;
      month = today.Month;
      day = today.Day;
    }

    var houseExists = await db.Houses.AnyAsync(h => h.ID == houseId);
    if (!houseExists) return NotFound("House not found");
    log.LogInformation($"Getting values for house {houseId}");

    var query = db.Entries.Where(e => e.HouseID == houseId);
    if (year.HasValue) query = query.Where(e => e.Year == year);
    if (month.HasValue) query = query.Where(e => e.Month == month);
    if (day.HasValue) query = query.Where(e => e.Day == day);
    if (type.HasValue) query = query.Where(e => e.Type == type);

    var results = await query.ToListAsync();
    return Ok(results);
  }

  [HttpPost("UpdateEntries")]
  public async Task<IActionResult> UpdateEntries([FromBody] List<Entry> entries) {
    var (user, error) = await auth.AuthorizeAsync(
      SignUpPrivilage: false,
      houseID: null,
      entries: entries.ToArray()
    );
    if (error != null) return error;
    log.LogInformation($"Entries to update are {entries}");

    foreach (var entry in entries) {
      var existingEntry = await db.Entries.FindAsync(entry.ID);
      if (existingEntry != null) {
        db.Entry(existingEntry).CurrentValues.SetValues(entry);
      } else {
        db.Entries.Add(entry);
      }
    }

    await db.SaveChangesAsync();
    return Ok(entries);
  }

  [HttpDelete]
  public async Task<IActionResult> DeleteEntries([FromQuery] int[] ids) {
    if (ids == null || ids.Length == 0) return BadRequest("No entry IDs provided");

    var entriesToDelete = new List<Entry>();
    foreach (var id in ids) {
      var entry = await db.Entries.FindAsync(id);
      if (entry != null) entriesToDelete.Add(entry);
    }

    var (user, error) = await auth.AuthorizeAsync(
        SignUpPrivilage: false,
        houseID: null,
        entries: entriesToDelete.ToArray()
    );
    if (error != null) return error;

    db.Entries.RemoveRange(entriesToDelete);
    await db.SaveChangesAsync();

    return Ok();
  }
}
