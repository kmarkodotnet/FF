using FlexForm.Api.Common;
using FlexForm.DDE.Data;
using FlexForm.DDE.Data.Entity;
using FlexForm.Identity.Common.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlexForm.Api.Admin.DataAccess
{
    public class UserAdminService : IUserAdminService
    {
        private readonly IUserService _userService;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserAdminService(
            IUserService userPermissionService,
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _userService = userPermissionService;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        #region User methods
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userService.GetUsers();
        }

        public async Task<User> GetUser(Guid userId)
        {
            return await _userService.GetUser(userId);
        }

        public async Task<User> SaveUser(User user)
        {
            var result = default(IdentityResult);
            var applicationUser = new ApplicationUser
            {
                Email = user.UserName,
                UserName = user.UserName,
                LastName = user.LastName,
                FirstName = user.FirstName
            };

            if (user.Id == default)
            {
                result = await _userManager.CreateAsync(applicationUser);
            }
            else
            {
                var originalUser = await _userManager.FindByIdAsync(user.Id.ToString());
                if (originalUser == null)
                {
                    result = IdentityResult.Failed(new IdentityError { Code = "DoesNotExist", Description = $"User {user.Id} does not exist" });
                }
                else
                {
                    originalUser.FirstName = applicationUser.FirstName;
                    originalUser.LastName = applicationUser.LastName;
                    result = await _userManager.UpdateAsync(originalUser);
                }
            }

            if (!result.Succeeded)
            {
                throw new Exception(result.Errors.FirstOrDefault()?.Description);
            }

            return await GetUser(applicationUser.Id);
        }

        public async Task<IdentityResult> LockOutUser(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Code = "DoesNotExist", Description = $"User {id} does not exist" });
            }

            user.LockoutEnd = DateTime.Now.AddYears(1000);
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                // TODO Force log out the locked user
                await _userManager.UpdateSecurityStampAsync(user);
            }

            return result;
        }
        #endregion

        #region UserGroup methods
        public async Task<IEnumerable<UserGroup>> GetUserGroups()
        {
            return await _userService.GetUserGroups();
        }

        public async Task<IEnumerable<UserGroup>> GetUserGroupsWithMembers()
        {
            return await _userService.GetUserGroupsWithMembers();
        }

        public async Task<UserGroup> GetUserGroup(Guid id)
        {
            return await _userService.GetUserGroup(id);
        }

        public async Task<UserGroup> GetUserGroupWithMembers(Guid id)
        {
            return await _userService.GetUserGroupWithMembers(id);
        }

        public async Task<UserGroup> SaveUserGroup(UserGroup userGroup)
        {
            return await _userService.SaveUserGroup(userGroup);
        }

        public async Task<bool> DeleteUserGroup(Guid id)
        {
            return await _userService.DeleteUserGroup(id);
        }

        public async Task<bool> IsUserGroupUsed(Guid userGroupId)
        {
            return await _userService.IsUserGroupUsed(userGroupId);
        }

        public async Task<IdentityResult> GrantUser(Guid userId, Guid userGroupId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            var role = await _roleManager.FindByIdAsync(userGroupId.ToString());

            if (user == null || role == null)
            {
                throw new Exception($"User {userId} or UserGroup {userGroupId} does not exist");
            }

            return await _userManager.AddToRoleAsync(user, role.Name);
        }

        public async Task<IdentityResult> RevokeUser(Guid userId, Guid userGroupId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            var role = await _roleManager.FindByIdAsync(userGroupId.ToString());

            if (user == null || role == null)
            {
                throw new Exception($"User {userId} or UserGroup {userGroupId} does not exist");
            }

            return await _userManager.RemoveFromRoleAsync(user, role.Name);
        }
        #endregion

        #region ApplicationRole methods

        public async Task<IEnumerable<ApplicationRole>> GetApplicationRoles()
        {
            return await _roleManager.Roles
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<ApplicationRole> GetApplicationRole(Guid id)
        {
            return await _roleManager.Roles
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<ApplicationRole> GetApplicationRole(string name)
        {
            return await _roleManager.FindByNameAsync(name);
        }

        public async Task<IdentityResult> SaveApplicationRole(ApplicationRole applicationRole)
        {
            if (applicationRole.Id != default)
            {
                var role = await _roleManager.FindByIdAsync(applicationRole.Id.ToString());

                if (role == null)
                {
                    return IdentityResult.Failed(new IdentityError { Code = "DoesNotExist", Description = "UserGroup does not exist" });
                }

                role.Name = applicationRole.Name;
                role.Description = applicationRole.Description;
                role.ConcurrencyStamp = applicationRole.ConcurrencyStamp;

                return await _roleManager.UpdateAsync(role);
            }
            else
            {
                var exists = await _roleManager.RoleExistsAsync(applicationRole.Name);
                if (exists)
                {
                    return IdentityResult.Failed(new IdentityError { Code = "AlreadyExists", Description = "UserGroup already exists" });
                }

                return await _roleManager.CreateAsync(applicationRole);
            }
        }

        public async Task<IdentityResult> DeleteApplicationRole(Guid id)
        {
            var userGroup = await _userService.GetUserGroup(id);
            if (userGroup == null)
            {
                return IdentityResult.Failed(new IdentityError { Code = "DoesNotExist", Description = $"UserGroup {id} does not exist" });
            }

            var isUserGroupUsed = await IsUserGroupUsed(id);
            if (isUserGroupUsed)
            {
                return IdentityResult.Failed(new IdentityError { Code = "IsInUse", Description = $"UserGroup {id} is in use" });
            }

            var applicationRole = await _roleManager.FindByIdAsync(id.ToString());

            return await _roleManager.DeleteAsync(applicationRole);
        }
        #endregion
    }
}
