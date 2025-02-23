using System.ComponentModel.DataAnnotations;
public class Entry {
    public int ID { get; set; }
    [Required]
    public int BookID { get; set; }
    public string? HouseNumber { get; set; }
    public string? RoomNumber { get; set; }
    public string? RepairDescription { get; set; }
    public string? NoticedDate { get; set; }
    public string? CompletedDate { get; set; }
    public string? EmergencyStartTime { get; set; } //The time when the emergency occurred or was handled.
    public string? TravelInfo { get; set; }
    public string? FeedbackToOffice { get; set; }
    public Book Book { get; set; } = null!;
}
