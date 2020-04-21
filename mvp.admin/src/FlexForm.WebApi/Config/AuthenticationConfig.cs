using IdentityModel;
using IdentityServer4;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FlexForm.WebApi.Config
{
    internal static class AuthenticationConfig
    {
        internal static IServiceCollection ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddAuthentication(options =>
                {
                    options.DefaultScheme = "Cookies";
                    options.DefaultChallengeScheme = "oidc";
                })
                .AddCookie("Cookies")
                .AddGoogle("Google", options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                    options.ClientId = configuration["GoogleAuthSettings:ClientId"];
                    options.ClientSecret = configuration["GoogleAuthSettings:ClientSecret"];
                })
                .AddFacebook("facebook", options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                    options.AppId = configuration["FacebookAuthSettings:AppId"];
                    options.AppSecret = configuration["FacebookAuthSettings:AppSecret"];
                })
                //.AddCookie("cookies", options =>
                //{
                //    options.AccessDeniedPath = "/account/denied";
                //})
                //.AddAutomaticTokenManagement()

                //.AddOpenIdConnect("oidc", options =>
                //{
                //    options.SignInScheme = "Cookies";
                //    options.Authority = "http://localhost:54856";
                //    options.ClientId = "native.code";
                //    options.ResponseType = "code";
                //    options.RequireHttpsMetadata = false;
                //    options.SaveTokens = true;
                //    options.GetClaimsFromUserInfoEndpoint = true;

                //    options.Scope.Clear();
                //    options.Scope.Add(IdentityServerConstants.StandardScopes.OpenId);
                //    options.Scope.Add(IdentityServerConstants.StandardScopes.Profile);
                //    options.Scope.Add(IdentityServerConstants.StandardScopes.Email);
                //    options.Scope.Add(IdentityServerConstants.StandardScopes.OfflineAccess);
                //    options.Scope.Add(IdentityServerConstants.LocalApi.ScopeName);
                //    options.Scope.Add(configuration["DDEApi:Scope"]);

                //    options.ClaimActions.MapAllExcept("iss", "nbf", "exp", "aud", "nonce", "iat", "c_hash", "at_hash");

                //    options.TokenValidationParameters = new TokenValidationParameters
                //    {
                //        NameClaimType = "name",
                //        RoleClaimType = "role"
                //    };

                //    options.Events.OnRedirectToIdentityProvider = context =>
                //    {
                //        // only modify requests to the authorization endpoint
                //        if (context.ProtocolMessage.RequestType == OpenIdConnectRequestType.Authentication)
                //        {
                //            // generate code_verifier
                //            var codeVerifier = CryptoRandom.CreateUniqueId(32);

                //            // store codeVerifier for later use
                //            context.Properties.Items.Add(OidcConstants.TokenRequest.CodeVerifier, codeVerifier);

                //            // create code_challenge
                //            string codeChallenge;
                //            using (var sha256 = SHA256.Create())
                //            {
                //                var challengeBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(codeVerifier));
                //                codeChallenge = Base64Url.Encode(challengeBytes);
                //            }

                //            // add code_challenge and code_challenge_method to request
                //            context.ProtocolMessage.Parameters.Add(OidcConstants.AuthorizeRequest.CodeChallenge, codeChallenge);
                //            context.ProtocolMessage.Parameters.Add(OidcConstants.AuthorizeRequest.CodeChallengeMethod, OidcConstants.CodeChallengeMethods.Sha256);
                //        }

                //        return Task.CompletedTask;
                //    };

                //    options.Events.OnAuthorizationCodeReceived = context =>
                //    {
                //        // only when authorization code is being swapped for tokens
                //        if (context.TokenEndpointRequest?.GrantType == OpenIdConnectGrantTypes.AuthorizationCode)
                //        {
                //            // get stored code_verifier
                //            if (context.Properties.Items.TryGetValue(OidcConstants.TokenRequest.CodeVerifier, out var codeVerifier))
                //            {
                //                // add code_verifier to token request
                //                context.TokenEndpointRequest.Parameters.Add(OidcConstants.TokenRequest.CodeVerifier, codeVerifier);
                //            }
                //        }

                //        return Task.CompletedTask;
                //    };
                //})

                .AddOpenIdConnect("oidc", options =>
                {
                    options.SignInScheme = "Cookies";
                    options.Authority = "http://localhost:54856";
                    options.ClientId = "angularui";
                    options.ResponseType = "id_token token";
                    options.RequireHttpsMetadata = false;
                    options.SaveTokens = true;
                    options.GetClaimsFromUserInfoEndpoint = true;

                    options.Scope.Clear();
                    options.Scope.Add(IdentityServerConstants.StandardScopes.OpenId);
                    options.Scope.Add(IdentityServerConstants.StandardScopes.Profile);
                    options.Scope.Add(IdentityServerConstants.StandardScopes.Email);
                    options.Scope.Add(IdentityServerConstants.StandardScopes.OfflineAccess);
                    options.Scope.Add(IdentityServerConstants.LocalApi.ScopeName);
                    options.Scope.Add(configuration["DDEApi:Scope"]);

                    options.ClaimActions.MapAllExcept("iss", "nbf", "exp", "aud", "nonce", "iat", "c_hash", "at_hash");

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = "name",
                        RoleClaimType = "role"
                    };

                    options.Events.OnRedirectToIdentityProvider = context =>
                    {
                        // only modify requests to the authorization endpoint
                        if (context.ProtocolMessage.RequestType == OpenIdConnectRequestType.Authentication)
                        {
                            // generate code_verifier
                            var codeVerifier = CryptoRandom.CreateUniqueId(32);

                            // store codeVerifier for later use
                            context.Properties.Items.Add(OidcConstants.TokenRequest.CodeVerifier, codeVerifier);

                            // create code_challenge
                            string codeChallenge;
                            using (var sha256 = SHA256.Create())
                            {
                                var challengeBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(codeVerifier));
                                codeChallenge = Base64Url.Encode(challengeBytes);
                            }

                            // add code_challenge and code_challenge_method to request
                            context.ProtocolMessage.Parameters.Add(OidcConstants.AuthorizeRequest.CodeChallenge, codeChallenge);
                            context.ProtocolMessage.Parameters.Add(OidcConstants.AuthorizeRequest.CodeChallengeMethod, OidcConstants.CodeChallengeMethods.Sha256);
                        }

                        return Task.CompletedTask;
                    };

                    options.Events.OnAuthorizationCodeReceived = context =>
                    {
                        // only when authorization code is being swapped for tokens
                        if (context.TokenEndpointRequest?.GrantType == OpenIdConnectGrantTypes.AuthorizationCode)
                        {
                            // get stored code_verifier
                            if (context.Properties.Items.TryGetValue(OidcConstants.TokenRequest.CodeVerifier, out var codeVerifier))
                            {
                                // add code_verifier to token request
                                context.TokenEndpointRequest.Parameters.Add(OidcConstants.TokenRequest.CodeVerifier, codeVerifier);
                            }
                        }

                        return Task.CompletedTask;
                    };
                })
                ;

            return services;
        }
    }
}
