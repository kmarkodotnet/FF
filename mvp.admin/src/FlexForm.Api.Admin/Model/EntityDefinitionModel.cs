using System.Collections.Generic;

namespace FlexForm.Api.Admin.Model
{
    public class EntityDefinitionModel : ModelBaseInt
    {
        public string Name { get; set; }

        public IEnumerable<FieldDefinitionModel> FieldDefinitions { get; set; }

        public bool HasEntityInstances { get; set; }

        public bool HasFormDefinitions { get; set; }
    }
}
