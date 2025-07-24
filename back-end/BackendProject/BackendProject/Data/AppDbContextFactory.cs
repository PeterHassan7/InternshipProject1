using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.ObjectPool;
using System.IO;
namespace BackendProject.Data
{
    public class AppDbContextFactory:  IDesignTimeDbContextFactory<AppDBContext>
    {
        public AppDBContext CreateDbContext(String[] args)
        {
            var configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            var optionsBuilder = new DbContextOptionsBuilder<AppDBContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseNpgsql(connectionString);
            return new AppDBContext(optionsBuilder.Options);
        }
    }
}
