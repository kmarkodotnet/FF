using System.Collections.Generic;

namespace FlexForm.Api.Admin.Model
{
    public class UserModel : UserSaveModel
    {
        public IEnumerable<UserGroupModel> UserGroups { get; set; }
    }
}
