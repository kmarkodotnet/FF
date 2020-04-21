using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;
using System.Collections.Generic;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class UserModelProfile : Profile
    {
        public UserModelProfile()
        {
            CreateMap<User, UserModel>()
                .ForMember(m => m.UserGroups, m => m.MapFrom(p => Mapper.Map<List<UserGroupModel>>(p.UserGroups)));
        }
    }
}
