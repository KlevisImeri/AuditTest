using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UserModel = User;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
  private readonly ApplicationDbContext db;
  private readonly LocalAccessControl auth;
  private readonly IConfiguration config;
  private readonly ILogger<UsersController> log;

  public UsersController(
    ApplicationDbContext context,
    LocalAccessControl authentication,
    IConfiguration configuration,
    ILogger<UsersController> logger
  ){
    db = context;
    auth = authentication;
    config = configuration;
    log = logger;
  }

  [HttpPost("signup")]
  public async Task<IActionResult> Register(
    [FromForm] string username,
    [FromForm] string password,
    [FromForm] string email,
    [FromForm] int houseId,
    [FromForm] bool todayOnly
  ){
    var (user, error) = await auth.AuthorizeAsync();
    if (error != null) return error;

    if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(email)) {
      return BadRequest("All fields are required");
    }

    if(houseId != UserModel.AllHouseIdConst) {
      var houseExists = db.Houses.Any(h => h.ID == houseId);
      if (!houseExists) return BadRequest("Invalid house ID");
    }

    if (db.Users.Any(u => u.Username == username)) {
      return Conflict("User already exists!");
    }

    var newUser = new User {
      Username = username,
      Password = password,
      Email = email,
      HouseID = houseId,
      TodayOnly = todayOnly
    };

    db.Users.Add(newUser);
    await db.SaveChangesAsync();

    return Ok(new { message = "User registered successfully" });
  }

  [HttpPost("login")]
  public IActionResult Login([FromForm] string username, [FromForm] string password) {
    var user = db.Users.SingleOrDefault(u => u.Username == username);
    if (user == null || user.Password != password) {
      return Unauthorized("Invalid username or password");
    }

    var token = GenerateJwtToken(user);
    return Ok(new { token });
  }

  [HttpPost("validate-token")]
  public async Task<IActionResult> ValidateToken() {
    var (user, error) = await auth.AuthenticateAsync();
    if (error != null) return error;

    return Ok(new { 
      username = user!.Username,
      houseId = user.HouseID,
      todayOnly = user.TodayOnly, 
    });
  }

  private string HashPassword(string password) {
    using (var sha256 = SHA256.Create()) {
      var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
      var builder = new StringBuilder();
      for (int i = 0; i < bytes.Length; i++) {
        builder.Append(bytes[i].ToString("x2"));
      }
      return builder.ToString();
    }
  }

  private string GenerateJwtToken(User user) {
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(config["Jwt:Key"]!);
    var tokenDescriptor = new SecurityTokenDescriptor {
      Subject = new ClaimsIdentity([
        new Claim(ClaimTypes.Name, user.Username!),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
      ]),
      Expires = DateTime.UtcNow.AddDays(7),
      SigningCredentials = new SigningCredentials(
      new SymmetricSecurityKey(key),
      SecurityAlgorithms.HmacSha256Signature
      )
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
  }
}
