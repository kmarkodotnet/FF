using System;

namespace FlexForm.Api.Admin.Model
{
    public class UserPermissionModel
    {
        public Guid UserId { get; set; }

        public Guid UserGroupId { get; set; }
    }
}
