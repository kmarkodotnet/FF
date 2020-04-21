using NetAppDev.DataAccess.EFCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace FlexForm.DDE.Data.Entity
{
    public class User : Entity<Guid>
    {
        public string UserName { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }


        #region Navigation properties

        public ICollection<UserGroupMember> UserGroupMember { get; set; }

        public ICollection<UserSettings> UserSettings { get; set; }

        #endregion

        [NotMapped]
        public IEnumerable<UserGroup> UserGroups
        {
            get { return UserGroupMember?.Select(m => m.UserGroup); }
        }
    }
}
