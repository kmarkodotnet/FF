using FlexForm.DDE.Common.Enums;

namespace FlexForm.Api.Admin.Model
{
    public class FieldDefinitionModel : ModelBaseInt
    {
        public string Name { get; set; }

        public int EntityDefinitionId { get; set; }

        public int? ItemSourceDefinitionId { get; set; }

        public FieldType FieldType { get; set; }

        public string Expression { get; set; }

        public ItemSourceDefinitionModel ItemSourceDefinition { get; set; }
    }
}
