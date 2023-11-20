using Microsoft.EntityFrameworkCore;
using RegistrationAPI.Models;

namespace RegistrationAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base
            (options)
        {

        }

        public DbSet<Student> Students { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=RegistrationDB;Trusted_Connection=true;TrustServerCertificate=true;");
        }

    }
}
