using FlexForm.DDE.Data.DataAccess.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace FlexForm.DDE.Data.DataAccess.Migrations
{
    internal class FlexFormDbContextFactory : IDesignTimeDbContextFactory<FlexFormDbContext>
    {
        public FlexFormDbContext CreateDbContext(string[] args)
        {
            var dbContext = new FlexFormDbContext(new DbContextOptionsBuilder<FlexFormDbContext>().UseSqlServer(
               new ConfigurationBuilder()
                   .AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), $"appsettings.json"))
                   .Build()
                   .GetConnectionString("DatabaseConnection")
               ).Options);

            dbContext.Database.Migrate();
            return dbContext;
        }
    }
}