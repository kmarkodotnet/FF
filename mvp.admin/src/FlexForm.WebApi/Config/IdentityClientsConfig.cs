using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FlexForm.WebApi.Config
{
    internal static class IdentityClientsConfig
    {
        // TODO configure from AppSettings
        internal static IEnumerable<Client> GetClientConfigurations(IConfiguration configuration)
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "native.code",
                    ClientName = "Native Client (Code with PKCE)",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,
                    RequirePkce = true,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    RequireConsent = false,
                    AllowOfflineAccess = true,
                    RefreshTokenUsage = TokenUsage.ReUse,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        IdentityServerConstants.LocalApi.ScopeName,
                        configuration["DDEApi:Scope"]
                    },
                    AllowedCorsOrigins =
                    {
                        "https://notused"
                    },
                    RedirectUris =
                    {
                        "https://notused"
                    },
                    PostLogoutRedirectUris =
                    {
                        "https://notused"
                    }
                },
                new Client
                {
                    AllowAccessTokensViaBrowser = true,
                    ClientId = "angularui",
                    ClientName = "Native Client (Code with PKCE) aui",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RequireClientSecret = false,
                    RequirePkce = true,
                    RequireConsent = false,
                    AllowOfflineAccess = true,
                    RefreshTokenUsage = TokenUsage.ReUse,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        IdentityServerConstants.LocalApi.ScopeName,
                        configuration["DDEApi:Scope"]
                    },
                    AllowedCorsOrigins =
                    {
                        "https://notused"
                    },
                    RedirectUris =
                    {
                        "https://notused"
                    },
                    PostLogoutRedirectUris =
                    {
                        "https://notused"
                    }
                }
            };
        }
    }
}
