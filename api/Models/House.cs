public class House {
    public int ID { get; set; }
    public string Address { get; set; } = string.Empty;
    public ICollection<Entry> Entries { get; set; } = new List<Entry>();
}
