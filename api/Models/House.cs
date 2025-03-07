using System.ComponentModel.DataAnnotations;

public class House {
  [Required] public int ID { get; set; }
  [Required] public string Address { get; set; } = string.Empty;
  public ICollection<Entry> Entries { get; set; } = new List<Entry>();
}
