using System.ComponentModel.DataAnnotations;
public class Entry {
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
    public string? HouseNumber { get; set; }
    public string? RoomNumber { get; set; }
    public string? RepairDescription { get; set; }
    public string? NoticedDate { get; set; }
    public string? CompletedDate { get; set; }
    public string? EmergencyStartTime { get; set; }
    public string? TravelInfo { get; set; }
    public string? FeedbackToOffice { get; set; }
}
