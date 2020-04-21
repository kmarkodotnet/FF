using FlexForm.Identity.Common.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FlexForm.WebApi.Config
{
    internal static class IdentityServerConfig
    {
        internal static IServiceCollection ConfigureIdentityServer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(IdentityConfig.IdentityResources)
                .AddInMemoryClients(IdentityClientsConfig.GetClientConfigurations(configuration))
                .AddInMemoryApiResources(IdentityConfig.GetApis(configuration))
                .AddAspNetIdentity<ApplicationUser>();

            services.AddLocalApiAuthentication();
            //services.AddAuthentication();
            //services.AddAuthorization();

            return services;
        }
    }
}
