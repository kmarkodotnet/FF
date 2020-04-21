using FlexForm.Identity.Common.Entities;
using System.Collections.Generic;
using System.Security.Claims;

namespace FlexForm.Api.Identity.Models
{
    internal class ExternalProviderResult
    {
        public ApplicationUser User { get; set; }

        public string Provider { get; set; }

        public string ProviderUserId { get; set; }

        public IEnumerable<Claim> Claims { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}
