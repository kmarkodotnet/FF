using FlexForm.DDE.Common.Enums;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity.Constraints
{
    public class FieldTypeConstraint
    {
        public FieldType FieldType { get; set; }

        public string Name { get; set; }


        #region Navigation properties

        public ICollection<FieldDefinition> FieldDefinitions { get; set; }

        #endregion
    }
}
