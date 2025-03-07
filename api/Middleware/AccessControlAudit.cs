using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

public class LocalAccessControl {
  private readonly ApplicationDbContext db;
  private readonly IHttpContextAccessor httpContext;
  private readonly ILogger<LocalAccessControl> log;

  public LocalAccessControl (
      ApplicationDbContext context,
      IHttpContextAccessor httpContextAccessor,
      ILogger<LocalAccessControl> logger
  ){
    db = context;
    httpContext = httpContextAccessor;
    log = logger;
  }
  
  public async Task<(User? user, IActionResult? error)> AuthenticateAsync() {
    log.LogInformation($"A user is trying to Authenticate!");
    var principal = httpContext.HttpContext?.User;
    if (principal == null) return (null, new UnauthorizedResult());

    var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
    if (userId == null || !int.TryParse(userId, out int userIdInt))
        return (null, new UnauthorizedResult());

    var user = await db.Users.FindAsync(userIdInt);
    if (user == null) return (null, new NotFoundObjectResult("User not found"));
    log.LogInformation($"User {user.Username} Authenticated!");

    return (user, null);
  }
  
  //If the input parameters get big you can create objects and default ones.
  //So its still easy to work with them.
  public async Task<(User? user, IActionResult? error)> AuthorizeAsync( //Allow list
    bool SignUpPrivilage = true,
    int? houseID = User.AllHouseIdConst,
    Entry[]? entries = null
  ){
    if(entries == null) entries = [];
  
    var (user, error) = await AuthenticateAsync();
    if (error != null) return (null, error);

    if (SignUpPrivilage && !user!.SignUpPrivilage) {
      return (null, new UnauthorizedResult());
    }

    if (houseID != null && 
        user!.HouseID != User.AllHouseIdConst &&
        user!.HouseID != houseID) 
        return (null, new ObjectResult("You cannot access this house") { StatusCode = 403 });

    foreach (var entry in entries) {
      if (user!.HouseID != User.AllHouseIdConst && user.HouseID != entry.HouseID) {
        return (null, new UnauthorizedResult());
      }
    }

    return (user, null);
  }

}
