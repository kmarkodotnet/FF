using FlexForm.DDE.Data.DataAccess.DbContexts;
using FlexForm.DDE.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlexForm.DDE.Data.DataAccess
{
    public class UserService : IUserService
    {
        private readonly FlexFormDbContext _context;

        public UserService(FlexFormDbContext context)
        {
            _context = context;
        }

        #region User methods
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users
                .Include(p => p.UserGroupMember)
                    .ThenInclude(p => p.UserGroup)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<User> GetUser(Guid userId)
        {
            return await _context.Users
                .Include(p => p.UserGroupMember)
                    .ThenInclude(p => p.UserGroup)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == userId);
        }
        #endregion

        #region UserGroup methods
        public async Task<IEnumerable<UserGroup>> GetUserGroups()
        {
            return await _context.UserGroups
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<UserGroup>> GetUserGroupsWithMembers()
        {
            return await _context.UserGroups
                .Include(u => u.UserGroupMembers)
                    .ThenInclude(u => u.User)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<UserGroup> GetUserGroup(Guid userGroupId)
        {
            return await _context.UserGroups
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == userGroupId);
        }

        public async Task<UserGroup> GetUserGroupWithMembers(Guid userGroupId)
        {
            return await _context.UserGroups
                .Include(u => u.UserGroupMembers)
                    .ThenInclude(u => u.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == userGroupId);
        }

        public async Task<UserGroup> SaveUserGroup(UserGroup userGroup)
        {
            if (userGroup.Id != default)
            {
                var originalUserGroup = await GetUserGroupWithMembers(userGroup.Id);

                if (originalUserGroup == null)
                {
                    throw new Exception($"UserGroup {userGroup.Id} does not exist, can not modify");
                }
            }
            else
            {
                var exists = await _context.UserGroups
                    .AnyAsync(u => u.Name == userGroup.Name);

                if (exists)
                {
                    throw new Exception($"UserGroup {userGroup.Name} already exists");
                }
            }

            _context.Update(userGroup);
            await _context.SaveChangesAsync();

            return userGroup;
        }

        public async Task<bool> DeleteUserGroup(Guid userGroupId)
        {
            var userGroup = await GetUserGroup(userGroupId);

            if (userGroup == null)
            {
                throw new Exception($"UserGroup {userGroup.Id} does not exist, can not delete");
            }

            var isUserGroupUsed = await IsUserGroupUsed(userGroupId);
            if (isUserGroupUsed)
            {
                throw new Exception($"UserGroup {userGroup.Id} is in use, can not delete");
            }

            _context.UserGroups.Remove(userGroup);
            var result = await _context.SaveChangesAsync();

            return result != 0;
        }

        public async Task<bool> IsUserGroupUsed(Guid userGroupId)
        {
            return await _context.UserGroups
                .AnyAsync(u => u.FormPermissions.Any() || u.UserGroupMembers.Any());
        }
        #endregion

        #region UserSettings methods

        public async Task<UserSettings> GetUserSettings(int userSettingsId)
        {
            return await _context.UserSettings
                .AsNoTracking()
                .Where(s => s.Id == userSettingsId)
                .FirstOrDefaultAsync();
        }

        public async Task<UserSettings> GetUserSettings(string name, Guid userId)
        {
            return await _context.UserSettings
                .AsNoTracking()
                .Where(s => s.Name == name && s.UserId == userId)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<UserSettings>> GetGlobalSettings(string name)
        {
            return await _context.UserSettings
                .AsNoTracking()
                .Where(s => s.Name == name && !s.UserId.HasValue)
                .ToListAsync();
        }

        public async Task<UserSettings> SaveUserSettings(UserSettings userSettings)
        {
            if (userSettings.Id != default)
            {
                var originalUserGroup = await GetUserSettings(userSettings.Id);

                if (originalUserGroup == null)
                {
                    throw new Exception($"UserSettings {userSettings.Id} does not exist, can not modify");
                }
            }
            else
            {
                var exists = await _context.UserSettings
                    .AnyAsync(u => u.Name == userSettings.Name && u.UserId == userSettings.UserId);

                if (exists)
                {
                    throw new Exception($"UserSettings {userSettings.Name} already exists for {userSettings.UserId}");
                }
            }

            _context.Update(userSettings);
            await _context.SaveChangesAsync();

            return userSettings;
        }

        public async Task<bool> DeleteUserSettings(int userSettingsId)
        {
            var userSettings = await GetUserSettings(userSettingsId);

            if (userSettings == null)
            {
                throw new Exception($"UserGroup {userSettings.Id} does not exist, can not delete");
            }

            _context.UserSettings.Remove(userSettings);
            var result = await _context.SaveChangesAsync();

            return result != 0;
        }

        #endregion
    }
}
