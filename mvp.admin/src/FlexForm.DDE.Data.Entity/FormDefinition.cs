using FlexForm.DDE.Common.Enums;
using FlexForm.DDE.Data.Entity.Constraints;
using NetAppDev.DataAccess.EFCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace FlexForm.DDE.Data.Entity
{
    public class FormDefinition : Entity<int>
    {
        public int? EntityDefinitionId { get; set; }

        public string FormName { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public FormType FormType { get; set; }

        public bool IsRootForm { get; set; }

        public bool IsInvalidStateEnabled { get; set; }

        [JsonIgnore]
        [Column("UiProperties")]
        public string UiPropertiesText { get; set; }


        #region Navigation properties

        public EntityDefinition EntityDefinition { get; set; }

        public ICollection<FormControl> FormControls { get; set; }

        public ICollection<FormControl> SubFormControls { get; set; }

        public ICollection<FormPermission> FormPermissions { get; set; }

        public ICollection<EntityInstanceArchive> EntityInstanceArchives { get; set; }

        public ICollection<ValidationRuleFormDefinition> ValidationRuleFormDefinitions { get; set; }

        public FormTypeConstraint FormTypeConstraint { get; set; }

        #endregion

        #region NotMapped properties

        public bool HasEntityInstances { get; set; }

        #endregion

        [NotMapped]
        public IEnumerable<UserGroup> UserGroups
        {
            get { return FormPermissions?.Select(fp => fp.UserGroup); }
        }

        [NotMapped]
        public dynamic UiProperties
        {
            get { return string.IsNullOrWhiteSpace(UiPropertiesText) ? null : JsonConvert.DeserializeObject(UiPropertiesText); }
            set { UiPropertiesText = value == null ? null : JsonConvert.SerializeObject(value); }
        }
    }
}
