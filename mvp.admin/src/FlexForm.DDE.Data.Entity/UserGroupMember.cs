using System;

namespace FlexForm.DDE.Data.Entity
{
    public class UserGroupMember
    {
        public Guid UserId { get; set; }

        public Guid UserGroupId { get; set; }


        #region Navigation properties

        public User User { get; set; }

        public UserGroup UserGroup { get; set; }

        #endregion
    }
}
