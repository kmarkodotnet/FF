using FlexForm.Api.Common;
using Microsoft.Extensions.DependencyInjection;

namespace FlexForm.WebApi.Config
{
    internal static class HttpClientFactoryConfig
    {
        internal static IServiceCollection ConfigureHttpClientFactory(this IServiceCollection services)
        {
            services
                .AddHttpClient()
                .AddHttpClient<DdeHttpClient>();

            return services;
        }
    }
}
