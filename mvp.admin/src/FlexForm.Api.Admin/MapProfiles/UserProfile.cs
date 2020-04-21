using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserSaveModel, User>()
                .ForMember(m => m.UserSettings, m => m.Ignore())
                .ForMember(m => m.UserGroupMember, m => m.Ignore())
                .ForMember(m => m.UserGroups, m => m.Ignore());

            CreateMap<UserModel, User>()
                .ForMember(m => m.UserSettings, m => m.Ignore())
                .ForMember(m => m.UserGroupMember, m => m.Ignore())
                .ForMember(m => m.UserGroups, m => m.Ignore());
        }
    }
}
