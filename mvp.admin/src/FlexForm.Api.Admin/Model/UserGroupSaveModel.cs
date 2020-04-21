using System;
using System.ComponentModel.DataAnnotations;

namespace FlexForm.Api.Admin.Model
{
    public class UserGroupSaveModel
    {
        public Guid? Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string ConcurrencyStamp { get; set; }
    }
}
