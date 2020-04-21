namespace FlexForm.DDE.Data.Entity
{
    public class ValidationRuleFormDefinition
    {
        public int ValidationRuleId { get; set; }

        public int FormDefinitionId { get; set; }


        #region Navigation properties

        public ValidationRule ValidationRule { get; set; }

        public FormDefinition FormDefinition { get; set; }

        #endregion
    }
}
