using System;
using Team.Data.ModelConfigurations;
using Team.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace Team.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<PlayerModel> Players { get; set; }
        public DbSet<TeamModel> Teams { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = localhost,1433; Database = Modul5HW7; User = sa; Password = PassW0rd;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PlayerModelConfiguration());
            modelBuilder.ApplyConfiguration(new TeamModelConfiguration());
        }
    }
}
