using FlexForm.DDE.Data.Entity;
using FlexForm.Identity.Common.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.Api.Common
{
    public interface IUserAdminService
    {
        Task<IEnumerable<User>> GetUsers();

        Task<User> GetUser(Guid userId);

        Task<User> SaveUser(User user);

        Task<IdentityResult> LockOutUser(Guid id);


        Task<IEnumerable<UserGroup>> GetUserGroups();

        Task<IEnumerable<UserGroup>> GetUserGroupsWithMembers();

        Task<UserGroup> GetUserGroup(Guid id);

        Task<UserGroup> GetUserGroupWithMembers(Guid id);

        Task<UserGroup> SaveUserGroup(UserGroup userGroup);

        Task<bool> DeleteUserGroup(Guid id);

        Task<bool> IsUserGroupUsed(Guid userGroupId);

        Task<IdentityResult> GrantUser(Guid userId, Guid userGroupId);

        Task<IdentityResult> RevokeUser(Guid userId, Guid userGroupId);


        Task<IEnumerable<ApplicationRole>> GetApplicationRoles();

        Task<ApplicationRole> GetApplicationRole(Guid id);

        Task<ApplicationRole> GetApplicationRole(string name);

        Task<IdentityResult> SaveApplicationRole(ApplicationRole applicationRole);

        Task<IdentityResult> DeleteApplicationRole(Guid id);
    }
}
