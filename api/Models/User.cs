using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User {
  [Required] public int Id { get; set; }
  [Required] public string? Username { get; set; }
  [Required] public string? Password { get; set; }
  [Required] public string? Email { get; set; }
  [Required] public int HouseID { get; set; } //-1 all houses
  [Required] public bool TodayOnly { get; set; }
  public bool SignUpPrivilage { get; set; }

  [NotMapped]
  public const int AllHouseIdConst = -1;
}
