using System.Collections.Generic;

namespace FlexForm.Api.Admin.Model
{
    public class UserGroupModel : UserGroupSaveModel
    {
        public IEnumerable<UserModel> UsersInGroup { get; set; }
    }
}
