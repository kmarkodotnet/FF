namespace FlexForm.DDE.Data.Entity
{
    public class ValidationRuleFieldDefinition
    {
        public int ValidationRuleId { get; set; }

        public int FieldDefinitionId { get; set; }


        #region Navigation properties

        public ValidationRule ValidationRule { get; set; }

        public FieldDefinition FieldDefinition { get; set; }

        #endregion
    }
}
