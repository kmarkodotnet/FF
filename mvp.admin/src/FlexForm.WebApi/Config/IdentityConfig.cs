using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FlexForm.WebApi.Config
{
    public class IdentityConfig
    {
        public static IEnumerable<IdentityResource> IdentityResources = new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Email(),
        };

        public static IEnumerable<ApiResource> GetApis(IConfiguration configuration)
        {
            return new List<ApiResource>
            { 
                // Local API
                new ApiResource(IdentityServerConstants.LocalApi.ScopeName),
                // DDE API
                new ApiResource(configuration["DDEApi:Scope"])
            };
        }
    }
}
