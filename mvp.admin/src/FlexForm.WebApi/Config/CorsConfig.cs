using Microsoft.Extensions.DependencyInjection;

namespace FlexForm.WebApi.Config
{
    internal static class CorsConfig
    {
        /// <summary>
        /// Add CORS policy for non-IdentityServer endpoints
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        internal static IServiceCollection ConfigureCORS(this IServiceCollection services)
        {
            services
                .AddCors(options =>
                    options.AddPolicy("Cors", builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    })
                );

            return services;
        }
    }
}
