using FlexForm.DDE.Common.Enums;
using FlexForm.DDE.Data.Entity.Constraints;
using NetAppDev.DataAccess.EFCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlexForm.DDE.Data.Entity
{
    public class FormControl : Entity<int>
    {
        public int FormDefinitionId { get; set; }

        public string Name { get; set; }

        public DisplayType DisplayType { get; set; }

        public int? FormControlItemSourceId { get; set; }

        public int? SubFormDefinitionId { get; set; }

        [JsonIgnore]
        [Column("UiProperties")]
        public string UiPropertiesText { get; set; }


        #region Navigation properties

        public FormDefinition FormDefinition { get; set; }

        public FormControlBinding FormControlBinding { get; set; }

        public FormControlItemSource FormControlItemSource { get; set; }

        public FormDefinition SubFormDefinition { get; set; }

        public DisplayTypeConstraint DisplayTypeConstraint { get; set; }

        #endregion

        [NotMapped]
        public dynamic UiProperties
        {
            get { return string.IsNullOrWhiteSpace(UiPropertiesText) ? null : JsonConvert.DeserializeObject(UiPropertiesText); }
            set { UiPropertiesText = value == null ? null : JsonConvert.SerializeObject(value); }
        }
    }
}
