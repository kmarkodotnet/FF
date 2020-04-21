using FlexForm.DDE.Common.Enums;
using System.Collections.Generic;

namespace FlexForm.Api.Admin.Model
{
    public class FormDefinitionModel : ModelBaseInt
    {
        public int? EntityDefinitionId { get; set; }

        public string FormName { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public FormType FormType { get; set; }

        public bool IsRootForm { get; set; }

        public bool IsInvalidStateEnabled { get; set; }

        public dynamic UiProperties { get; set; }

        public IEnumerable<FormControlModel> FormControls { get; set; }

        public bool HasEntityInstances { get; set; }
    }
}
