namespace FlexForm.DDE.Data.Entity
{
    public class ValidationRuleFormControlBinding
    {
        public int ValidationRuleId { get; set; }

        public int FormControlBindingId { get; set; }


        #region Navigation properties

        public ValidationRule ValidationRule { get; set; }

        public FormControlBinding FormControlBinding { get; set; }

        #endregion
    }
}
