using FlexForm.DDE.Common.Enums;
using FlexForm.DDE.Data.Entity.Constraints;
using NetAppDev.DataAccess.EFCore;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity
{
    public class FieldDefinition : Entity<int>
    {
        public string Name { get; set; }

        public int EntityDefinitionId { get; set; }

        public int? ItemSourceDefinitionId { get; set; }

        public FieldType FieldType { get; set; }

        public string Expression { get; set; }


        #region Navigation properties

        public EntityDefinition EntityDefinition { get; set; }

        public ItemSourceDefinition ItemSourceDefinition { get; set; }

        public ICollection<FieldValue> FieldValues { get; set; } 

        public ICollection<FormControlBinding> FormControlBindings { get; set; }

        public ICollection<ValidationRuleFieldDefinition> ValidationRuleFieldDefinitions { get; set; }

        public FieldTypeConstraint FieldTypeConstraint { get; set; }

        #endregion
    }
}
