using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext {
  public DbSet<User> Users { get; set; } = null!;
  public DbSet<House> Houses { get; set; } = null!;
  public DbSet<Book> Books { get; set; } = null!;
  public DbSet<Entry> Entries { get; set; } = null!;

  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    base.OnModelCreating(modelBuilder);
  }
}
