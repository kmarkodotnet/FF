using NetAppDev.DataAccess.EFCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace FlexForm.DDE.Data.Entity
{
    public class UserGroup : Entity<Guid>
    {
        public string Name { get; set; }

        public string Description { get; set; }


        #region Navigation properties

        public ICollection<UserGroupMember> UserGroupMembers { get; set; }

        public ICollection<FormPermission> FormPermissions { get; set; }

        #endregion

        [NotMapped]
        public IEnumerable<User> Users
        {
            get { return UserGroupMembers?.Select(m => m.User); }
        }

        [NotMapped]
        public IEnumerable<FormDefinition> FormDefinitions
        {
            get { return FormPermissions?.Select(m => m.FormDefinition); }
        }

        #region Methods
        public void AddMember(params User[] users)
        {
            if (UserGroupMembers == null)
            {
                UserGroupMembers = new HashSet<UserGroupMember>();
            }
            if (users != null)
            {
                foreach (var u in users)
                {
                    if (!UserGroupMembers.Any(m => m.UserId == u.Id))
                    {
                        UserGroupMembers.Add(new UserGroupMember { UserGroup = this, User = u });
                    }
                }
            }
        }

        public void AddFormDefinition(params FormDefinition[] formDefinitions)
        {
            if (FormPermissions == null)
            {
                FormPermissions = new HashSet<FormPermission>();
            }
            if (formDefinitions != null)
            {
                foreach (var f in formDefinitions)
                {
                    if (!FormPermissions.Any(m => m.FormDefinitionId == f.Id))
                    {
                        FormPermissions.Add(new FormPermission { UserGroup = this, FormDefinition = f });
                    }
                }
            }
        }
        #endregion
    }
}
