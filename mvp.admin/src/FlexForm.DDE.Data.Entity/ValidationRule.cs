using NetAppDev.DataAccess.EFCore;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity
{
    public class ValidationRule : Entity<int>
    {
        public string Name { get; set; }

        public string ValidationMethod { get; set; }

        public string Parameter { get; set; }

        public string ValidationErrorMessage { get; set; }


        #region Navigation properties

        public ICollection<ValidationRuleFieldDefinition> ValidationRuleFieldDefinitions { get; set; } 

        public ICollection<ValidationRuleFormControlBinding> ValidationRuleFormControlBindings { get; set; } 

        public ICollection<ValidationRuleFormDefinition> ValidationRuleFormDefinitions { get; set; } 

        #endregion
    }
}
