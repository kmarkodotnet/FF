using NetAppDev.DataAccess.EFCore;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlexForm.DDE.Data.Entity
{
    public class UserSettings : Entity<int>
    {
        public string Name { get; set; }

        public Guid? UserId { get; set; }

        [JsonIgnore]
        [Column("UiProperties")]
        public string UiPropertiesText { get; set; }


        #region Navigation properties

        public User User { get; set; }

        #endregion

        [NotMapped]
        public dynamic UiProperties
        {
            get { return string.IsNullOrWhiteSpace(UiPropertiesText) ? null : JsonConvert.DeserializeObject(UiPropertiesText); }
            set { UiPropertiesText = value == null ? null : JsonConvert.SerializeObject(value); }
        }
    }
}
