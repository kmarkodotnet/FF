using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.Identity.Common.Entities;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class ApplicationRoleProfile : Profile
    {
        public ApplicationRoleProfile()
        {
            CreateMap<UserGroupSaveModel, ApplicationRole>()
                .ForMember(m => m.NormalizedName, m => m.Ignore());
        }
    }
}
