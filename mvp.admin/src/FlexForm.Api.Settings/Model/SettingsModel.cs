using System;

namespace FlexForm.Api.Settings.Model
{
    public class SettingsModel
    {
        public int Id { get; set; }

        public byte[] Timestamp { get; set; }

        public string Name { get; set; }

        public Guid? UserId { get; set; }

        public dynamic UiProperties { get; set; }
    }
}
