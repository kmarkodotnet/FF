using FlexForm.Identity.Common.DbContexts;
using FlexForm.Identity.Common.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FlexForm.WebApi.Config
{
    internal static class EntityFrameworkIdentityConfig
    {
        internal static IServiceCollection ConfigureEntityFrameworkIdentity(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddDbContext<ApplicationUserDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services
                .AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationUserDbContext>()
                .AddDefaultTokenProviders();

            return services;
        }
    }
}
