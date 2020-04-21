using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace FlexForm.Api.Common
{
    public class DdeHttpClient
    {
        private readonly HttpClient _client;

        public DdeHttpClient(HttpClient httpClient)
        {
            httpClient.BaseAddress = new Uri("http://localhost:57165/");
            httpClient.DefaultRequestHeaders.Add("User-Agent", "FlexForm.WebApi");
            _client = httpClient;
        }

        public async Task<HttpClient> GetCientWithToken(HttpContext httpContext)
        {
            var token = await httpContext.GetTokenAsync("Cookies", "access_token");
            _client.SetBearerToken(token);

            return _client;
        }
    }
}
