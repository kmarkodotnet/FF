using FlexForm.DDE.Data.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.DDE.Data
{
    public interface IFormDefinitionService
    {
        Task<IEnumerable<FormDefinition>> GetFormDefinitions();

        Task<FormDefinition> GetFormDefinition(int id);

        Task<FormDefinition> SaveFormDefinition(FormDefinition formDefinition);

        Task<int> DeleteFormDefinition(int id);
    }
}
