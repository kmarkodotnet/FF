using AutoMapper;
using FlexForm.Api.Settings.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Settings.MapProfiles
{
    public class UserSettingsProfile : Profile
    {
        public UserSettingsProfile()
        {
            CreateMap<SettingsModel, UserSettings>()
                .ForMember(m => m.UiPropertiesText, m => m.Ignore())
                .ForMember(m => m.User, m => m.Ignore());
        }
    }
}
