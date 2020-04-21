using AutoMapper;

namespace FlexForm.WebApi.Config
{
    public static class AutoMapperConfig
    {
        public static void Configure()
        {
            var assemblies = AssemblyConfig.LoadAssemblies();

            Mapper.Initialize(x => x.AddMaps(assemblies));
            Mapper.AssertConfigurationIsValid();
        }
    }
}
