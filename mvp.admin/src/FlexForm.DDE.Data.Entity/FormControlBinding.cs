using NetAppDev.DataAccess.EFCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlexForm.DDE.Data.Entity
{
    public class FormControlBinding : Entity<int>
    {
        [ForeignKey("FormControl")]
        public override int Id { get => base.Id; set => base.Id = value; }

        public int FieldDefinitionId { get; set; }

        public bool IsReadOnly { get; set; }

        public bool IsInvalidStateEnabled { get; set; }

        [JsonIgnore]
        [Column("UiProperties")]
        public string UiPropertiesText { get; set; }


        #region Navigation properties

        public FieldDefinition FieldDefinition { get; set; }

        public FormControl FormControl { get; set; }

        public ICollection<ValidationRuleFormControlBinding> ValidationRuleFormControlBindings { get; set; }

        #endregion

        [NotMapped]
        public dynamic UiProperties
        {
            get { return string.IsNullOrWhiteSpace(UiPropertiesText) ? null : JsonConvert.DeserializeObject(UiPropertiesText); }
            set { UiPropertiesText = value == null ? null : JsonConvert.SerializeObject(value); }
        }
    }
}
