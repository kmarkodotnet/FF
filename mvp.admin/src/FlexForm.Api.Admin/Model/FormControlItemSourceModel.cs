namespace FlexForm.Api.Admin.Model
{
    public class FormControlItemSourceModel : ModelBaseInt
    {
        public string ItemSourceCondition { get; set; }

        public string ItemSourceOrder { get; set; }

        public string IncludeProperties { get; set; }

        public int PageSize { get; set; }
    }
}
