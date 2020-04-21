using FlexForm.DDE.Data.Entity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.DDE.Data
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsers();

        Task<User> GetUser(Guid userId);


        Task<IEnumerable<UserGroup>> GetUserGroups();

        Task<IEnumerable<UserGroup>> GetUserGroupsWithMembers();

        Task<UserGroup> GetUserGroup(Guid userGroupId);

        Task<UserGroup> GetUserGroupWithMembers(Guid userGroupId);

        Task<UserGroup> SaveUserGroup(UserGroup userGroup);

        Task<bool> DeleteUserGroup(Guid userGroupId);

        Task<bool> IsUserGroupUsed(Guid userGroupId);

        Task<UserSettings> GetUserSettings(int userSettingsId);

        Task<UserSettings> GetUserSettings(string name, Guid userId);

        Task<IEnumerable<UserSettings>> GetGlobalSettings(string name);

        Task<UserSettings> SaveUserSettings(UserSettings userSettings);

        Task<bool> DeleteUserSettings(int userSettingsId);
    }
}
