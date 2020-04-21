using FlexForm.Api.Common;
using FlexForm.DDE.Data;
using FlexForm.DDE.Data.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.Api.Admin.DataAccess
{
    public class FormAdminService : IFormAdminService
    {
        private readonly IFormDefinitionService _formDefinitionService;

        public FormAdminService(IFormDefinitionService formDefinitionService)
        {
            _formDefinitionService = formDefinitionService;
        }

        public async Task<FormDefinition> GetFormDefinition(int id)
        {
            return await _formDefinitionService.GetFormDefinition(id);
        }

        public async Task<IEnumerable<FormDefinition>> GetFormDefinitions()
        {
            return await _formDefinitionService.GetFormDefinitions();
        }

        public async Task<FormDefinition> SaveFormDefinition(FormDefinition formDefinition)
        {
            return await _formDefinitionService.SaveFormDefinition(formDefinition);
        }

        public async Task<int> DeleteFormDefinition(int id)
        {
            return await _formDefinitionService.DeleteFormDefinition(id);
        }
    }
}
