public class User {
  public int Id { get; set; }
  public string Username { get; set; }
  public string Password { get; set; }
  public string Email { get; set; }
  public int HouseID { get; set; } //-1 all
  public bool TodayOnly { get; set; }
}
