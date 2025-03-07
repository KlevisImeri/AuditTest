using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

public class Entry {
  [Required] public int ID { get; set; }
  [Required] public int HouseID { get; set; }
  public int? Year { get; set; }
  public int? Month { get; set; }
  public int? Day { get; set; }
  [BindNever] public House? House { get; set; }
  public EntryType? Type { get; set;} = EntryType.Day;
  public string? HouseNumber { get; set; }
  public string? RoomNumber { get; set; }
  public string? RepairDescription { get; set; }
  public string? NoticedDate { get; set; }
  public string? CompletedDate { get; set; }
  public string? EmergencyStartTime { get; set; }
  public string? TravelInfo { get; set; }
  public string? FeedbackToOffice { get; set; }

  public enum EntryType {
    Day,
    Ventilation,
    Water, 
  }
}
