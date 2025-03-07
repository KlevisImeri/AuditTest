using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class HousesController : ControllerBase {
  private readonly ApplicationDbContext db;
  private readonly LocalAccessControl ac;

  public HousesController (
    ApplicationDbContext context,
    LocalAccessControl accessControl
  ){
    db = context;
    ac = accessControl;
  }

  [HttpGet]
  public async Task<IActionResult> GetHouses() {
    var (user, error) = await ac.AuthorizeAsync();
    if(error != null) return error;

    var houses = await db.Houses.ToListAsync();
    return Ok(houses);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetHouseById(int id) { 
    var (user, error) = await ac.AuthorizeAsync(
      SignUpPrivilage: false,
      houseID: id
    );
    if(error != null) return error;

    var house = await db.Houses.FindAsync(id);
    if (house == null) return NotFound($"House with ID {id} not found.");
    return Ok(house);
  }
}
