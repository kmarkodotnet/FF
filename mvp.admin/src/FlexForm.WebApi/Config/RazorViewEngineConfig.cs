using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

namespace FlexForm.WebApi.Config
{
    internal static class RazorViewEngineConfig
    {
        internal static IServiceCollection ConfigureRazorViewEngineOptions(this IServiceCollection services)
        {
            services.Configure<RazorViewEngineOptions>(options =>
            {
                options.FileProviders.Add(
                    new EmbeddedFileProvider(typeof(Api.Identity.Module).Assembly));
            });

            return services;
        }
    }
}
