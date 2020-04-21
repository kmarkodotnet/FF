using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace FlexForm.WebApi.Config
{
    public static class AssemblyConfig
    {
        public static IEnumerable<Assembly> LoadAssemblies()
        {
            var codebase = Path.GetFullPath(Assembly.GetExecutingAssembly().CodeBase.Replace(@"file:///", ""));
            var files = Directory.EnumerateFiles(Path.GetDirectoryName(codebase), "FlexForm.*.dll", SearchOption.TopDirectoryOnly)
                .Where(f => Path.GetFileName(f) != "FlexForm.WebApi.Views.dll");

            var assemblies = files
                .Select(AssemblyName.GetAssemblyName);
            var loadedAssemblies = assemblies
                .Select(Assembly.Load);

            return loadedAssemblies;
        }
    }
}
