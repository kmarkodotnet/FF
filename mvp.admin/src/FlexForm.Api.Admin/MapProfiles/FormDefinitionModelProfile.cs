using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;
using System.Collections.Generic;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class FormDefinitionModelProfile : Profile
    {
        public FormDefinitionModelProfile()
        {
            CreateMap<FormDefinition, FormDefinitionModel>()
                .ForMember(m => m.FormControls, m => m.MapFrom(p => Mapper.Map<List<FormControlModel>>(p.FormControls)));
        }
    }
}
