public class House {
    public int ID { get; set; }
    public string Address { get; set; } = string.Empty;
    public ICollection<Book> CommunicationBooks { get; set; } = new List<Book>();
}
