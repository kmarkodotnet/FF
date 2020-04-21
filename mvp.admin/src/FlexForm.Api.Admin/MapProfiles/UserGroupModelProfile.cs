
using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;
using FlexForm.Identity.Common.Entities;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class UserGroupModelProfile : Profile
    {
        public UserGroupModelProfile()
        {
            CreateMap<ApplicationRole, UserGroupModel>()
                .ForMember(m => m.UsersInGroup, m => m.Ignore());

            CreateMap<UserGroup, UserGroupModel>()
                .ForMember(m => m.ConcurrencyStamp, m => m.Ignore())
                .ForMember(m => m.UsersInGroup, m => m.Ignore());
        }
    }
}
