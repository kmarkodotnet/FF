using FlexForm.DDE.Data.Entity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlexForm.Api.Common
{
    public interface ISettingsService
    {
        Task<UserSettings> GetUserSettings(int userSettingsId);

        Task<UserSettings> GetUserSettings(string name, Guid userId);

        Task<IEnumerable<UserSettings>> GetGlobalSettings(string name);

        Task<UserSettings> SaveUserSettings(UserSettings userSettings);

        Task<bool> DeleteUserSettings(int userSettingsId);
    }
}
