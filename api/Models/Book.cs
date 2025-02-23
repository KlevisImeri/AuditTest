using System.ComponentModel.DataAnnotations;

public class Book {
    public int ID { get; set; }
    [Required]
    public int HouseID { get; set; }
    [Required]
    public int Year { get; set; }
    [Required]
    public int Month { get; set; }
    [Required]
    public int Day { get; set; }
    public House House { get; set; } = null!;
    public ICollection<Entry> Entries { get; set; } = new List<Entry>();
}
