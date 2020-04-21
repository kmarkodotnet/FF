using FlexForm.DDE.Data;
using FlexForm.Identity.Common;
using FlexForm.WebApi.Config;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NetAppDev.Common.Diagnostic;
using NetAppDev.Composition;
using NetAppDev.DataAccess;
using NetAppDev.DataAccess.EFCore;
using System;
using System.Linq;
using Unity;
using Unity.Injection;
using Unity.RegistrationByConvention;

namespace FlexForm.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            // set the logger factory
            Logger.SetLoggerFactory(() => UnityConfig.Container.Resolve<ILogger>());

            // scan for AutoMapper profiles
            AutoMapperConfig.Configure();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc(options =>
                {
                    var global = new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .Build();

                    options.Filters.Add(new AuthorizeFilter(global));
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .ConfigureJson();

            //Add views provided in this assembly.
            services
                .ConfigureHttpClientFactory()
                .ConfigureCookiePolicy()
                .ConfigureEntityFrameworkIdentity(Configuration)
                .ConfigureRazorViewEngineOptions()
                .ConfigureIdentityServer(Configuration)
                .ConfigureAuthentication(Configuration)
                // preserve OIDC state in cache (solves problems with AAD and URL lenghts)
                .AddOidcStateDataFormatterCache("aad")
                .ConfigureCORS()
                .ConfigureSwagger();


            // demo versions (never use in production)
            services.AddTransient<IRedirectUriValidator, DemoRedirectValidator>();
            services.AddTransient<ICorsPolicyService, DemoCorsPolicy>();
        }

        public void ConfigureContainer(IUnityContainer container)
        {
            // Data Access
            var configuration = container.Resolve<IConfiguration>();
            container.RegisterSingleton<IConnectionFactory, SqlConnectionFactory>(Connections.FlexFormDDE, new InjectionConstructor(ConfigurationExtensions.GetConnectionString(configuration, Connections.FlexFormDDE)));
            container.RegisterSingleton<IConnectionFactory, SqlConnectionFactory>(Connections.FlexFormDDEArchive, new InjectionConstructor(ConfigurationExtensions.GetConnectionString(configuration, Connections.FlexFormDDEArchive)));
            container.RegisterSingleton<IConnectionFactory, SqlConnectionFactory>(Connections.FlexFormLogging, new InjectionConstructor(ConfigurationExtensions.GetConnectionString(configuration, Connections.FlexFormLogging)));

            // Could be used to register more types

            // scan the bin folder and register all detected ICompositionModule
            var assemblies = AssemblyConfig.LoadAssemblies();
            var moduleList = AllClasses.FromAssemblies(assemblies, false)
                .Where(x => x.GetInterfaces().Any(i => Equals(i, typeof(ICompositionModule))))
                .Select(x => (ICompositionModule)Activator.CreateInstance(x));

            foreach (var module in moduleList)
            {
                module.Register(container);
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IUnityContainer container)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "FlexForm.WebAPI V1");
            });

            app.UseCors("Cors");
            app.UseStaticFiles();
            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseMvcWithDefaultRoute();
        }
    }
}
