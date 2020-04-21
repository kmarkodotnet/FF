using System;
using System.ComponentModel.DataAnnotations;

namespace FlexForm.Api.Admin.Model
{
    public class UserSaveModel
    {
        public Guid Id { get; set; }

        public byte[] Timestamp { get; set; }

        [Required]
        [EmailAddress]
        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
