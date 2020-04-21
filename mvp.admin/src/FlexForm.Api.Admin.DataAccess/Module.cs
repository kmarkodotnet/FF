using FlexForm.Api.Common;
using NetAppDev.Composition;
using Unity;

namespace FlexForm.Api.Admin.DataAccess
{
    public class Module : ICompositionModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<IFormAdminService, FormAdminService>();
            container.RegisterType<IEntityAdminService, EntityAdminService>();
            container.RegisterType<IUserAdminService, UserAdminService>();
            container.RegisterType<ISettingsService, SettingsService>();
        }
    }
}
