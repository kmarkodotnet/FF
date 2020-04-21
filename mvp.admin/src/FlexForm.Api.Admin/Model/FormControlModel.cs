using FlexForm.DDE.Common.Enums;

namespace FlexForm.Api.Admin.Model
{
    public class FormControlModel : ModelBaseInt
    {
        public int FormDefinitionId { get; set; }

        public string Name { get; set; }

        public DisplayType DisplayType { get; set; }

        public int? FormControlItemSourceId { get; set; }

        public int? SubFormDefinitionId { get; set; }

        public dynamic UiProperties { get; set; }

        public FormControlBindingModel FormControlBinding { get; set; }

        public FormControlItemSourceModel FormControlItemSource { get; set; }

        public FormDefinitionModel SubFormDefinition { get; set; }
    }
}
