using FlexForm.Api.Common;
using NetAppDev.Common.Diagnostic;
using System;
using Unity;

namespace FlexForm.WebApi.Config
{
    public sealed class UnityConfig
    {
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(CreateContainer);

        /// <summary>
        /// Gets the configured <see cref="IUnityContainer"/>.
        /// </summary>
        public static IUnityContainer Container
        {
            get
            {
                return container.Value;
            }
        }

        private static IUnityContainer CreateContainer()
        {
            var container = new UnityContainer();

            RegisterGlobalComponents(container);

            return container;
        }

        /// <summary>
        /// Registers components from the referenced assemblies containing types used by auto-discovered modules. 
        /// </summary>
        /// <param name="container"></param>
        private static void RegisterGlobalComponents(IUnityContainer container)
        {
            // DataAccess components

            // logging mechanism
            container.RegisterType<ILogger, DummyLogger>();

            // settings
            //container.RegisterType<ISettingsManager, SettingsManager>();
        }
    }
}
