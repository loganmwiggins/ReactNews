using Microsoft.EntityFrameworkCore;
using ReactNews.Server.Data.Models;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection.Emit;
namespace ReactNews.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Tables
        public DbSet<Article> Articles { get; set; }

        // Config
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(connectionString:
                "Server=localhost;Port=5432;User Id=postgres;Password=password;Database=reactnews;Include Error Detail=true;");
            base.OnConfiguring(optionsBuilder);
        }
    }
}