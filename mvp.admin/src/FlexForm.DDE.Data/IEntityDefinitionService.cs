using FlexForm.DDE.Data.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.DDE.Data
{
    public interface IEntityDefinitionService
    {
        Task<IEnumerable<EntityDefinition>> GetEntityDefinitions();

        Task<EntityDefinition> GetEntityDefinition(int id);

        Task<EntityDefinition> SaveEntityDefinition(EntityDefinition entityDefinition);

        Task<int> DeleteEntityDefinition(int id);
    }
}
