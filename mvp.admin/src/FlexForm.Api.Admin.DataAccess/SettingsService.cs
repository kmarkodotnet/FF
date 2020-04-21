using FlexForm.Api.Common;
using FlexForm.DDE.Data;
using FlexForm.DDE.Data.Entity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.Api.Admin.DataAccess
{
    public class SettingsService : ISettingsService
    {
        private readonly IUserService _userService;

        public SettingsService(IUserService userService)
        {
            _userService = userService;
        }
        #region UserSettings methods

        public async Task<UserSettings> GetUserSettings(int userSettingsId)
        {
            return await _userService.GetUserSettings(userSettingsId);
        }

        public async Task<UserSettings> GetUserSettings(string name, Guid userId)
        {
            return await _userService.GetUserSettings(name, userId);
        }

        public async Task<IEnumerable<UserSettings>> GetGlobalSettings(string name)
        {
            return await _userService.GetGlobalSettings(name);
        }

        public async Task<UserSettings> SaveUserSettings(UserSettings userSettings)
        {
            return await _userService.SaveUserSettings(userSettings);
        }

        public async Task<bool> DeleteUserSettings(int userSettingsId)
        {
            return await _userService.DeleteUserSettings(userSettingsId);
        }

        #endregion
    }
}
