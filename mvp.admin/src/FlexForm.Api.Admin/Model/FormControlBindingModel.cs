namespace FlexForm.Api.Admin.Model
{
    public class FormControlBindingModel : ModelBaseInt
    {
        public int FieldDefinitionId { get; set; }

        public bool IsReadOnly { get; set; }

        public bool IsInvalidStateEnabled { get; set; }

        public dynamic UiProperties { get; set; }
    }
}
