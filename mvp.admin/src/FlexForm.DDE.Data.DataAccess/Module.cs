using FlexForm.DDE.Data.DataAccess.DbContexts;
using NetAppDev.Composition;
using Unity;

namespace FlexForm.DDE.Data.DataAccess
{
    public class Module : ICompositionModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<FlexFormDbContext, FlexFormDbContext>();

            container.RegisterType<IFormDefinitionService, FormDefinitionService>();
            container.RegisterType<IEntityDefinitionService, EntityDefinitionService>();
            container.RegisterType<IUserService, UserService>();
        }
    }
}
