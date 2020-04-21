using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace FlexForm.WebApi.Config
{
    internal static class SwaggerConfig
    {
        internal static IServiceCollection ConfigureSwagger(this IServiceCollection services)
        {
            services
                .AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1",
                        new Info
                        {
                            Title = "FlexForm.WebAPI",
                            Version = "v1"
                        });
                });

            return services;
        }
    }
}
