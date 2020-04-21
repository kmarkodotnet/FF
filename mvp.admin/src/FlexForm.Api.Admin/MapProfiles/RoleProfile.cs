using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.Identity.Common.Entities;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<UserGroupModel, ApplicationRole>()
                .ForMember(m => m.NormalizedName, m => m.Ignore());
        }
    }
}
