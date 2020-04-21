using AutoMapper;
using FlexForm.Api.Settings.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Settings.MapProfiles
{
    public class SettingsModelProfile : Profile
    {
        public SettingsModelProfile()
        {
            CreateMap<UserSettings, SettingsModel>();
        }
    }
}
