namespace FlexForm.Api.Admin.Model
{
    public class ItemSourceDefinitionModel : ModelBaseInt
    {
        public string Name { get; set; }

        public int ItemSourceEntityDefinitionId { get; set; }

        public bool IsSingleResult { get; set; }

        public string ItemSourceCondition { get; set; }

        public string ItemSourceDefaultOrder { get; set; }

        public string IncludeProperties { get; set; }

        public int PageSize { get; set; }
    }
}
