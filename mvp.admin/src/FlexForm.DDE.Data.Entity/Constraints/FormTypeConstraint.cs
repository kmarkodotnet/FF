using FlexForm.DDE.Common.Enums;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity.Constraints
{
    public class FormTypeConstraint
    {
        public FormType FormType { get; set; }

        public string Name { get; set; }


        #region Navigation properties

        public ICollection<FormDefinition> FormDefinitions { get; set; }

        #endregion
    }
}
