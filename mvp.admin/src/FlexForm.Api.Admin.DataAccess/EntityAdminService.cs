using FlexForm.Api.Common;
using FlexForm.DDE.Data;
using FlexForm.DDE.Data.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.Api.Admin.DataAccess
{
    public class EntityAdminService : IEntityAdminService
    {
        private readonly IEntityDefinitionService _entityDefinitionService;

        public EntityAdminService(IEntityDefinitionService entityDefinitionService)
        {
            _entityDefinitionService = entityDefinitionService;
        }

        public async Task<EntityDefinition> GetEntityDefinition(int id)
        {
            var entity = await _entityDefinitionService.GetEntityDefinition(id);

            return entity;
        }

        public async Task<IEnumerable<EntityDefinition>> GetEntityDefinitions()
        {
            var entities = await _entityDefinitionService.GetEntityDefinitions();

            return entities;
        }

        public async Task<EntityDefinition> SaveEntityDefinition(EntityDefinition entityDefinition)
        {
            await _entityDefinitionService.SaveEntityDefinition(entityDefinition);

            return entityDefinition;
        }

        public async Task<int> DeleteEntityDefinition(int id)
        {
            return await _entityDefinitionService.DeleteEntityDefinition(id);
        }
    }
}
