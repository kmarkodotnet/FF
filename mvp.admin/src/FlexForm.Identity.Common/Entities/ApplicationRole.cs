using Microsoft.AspNetCore.Identity;
using System;

namespace FlexForm.Identity.Common.Entities
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        public string Description { get; set; }
    }
}
