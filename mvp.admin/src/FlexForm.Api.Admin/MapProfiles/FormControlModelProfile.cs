using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class FormControlModelProfile : Profile
    {
        public FormControlModelProfile()
        {
            CreateMap<FormControl, FormControlModel>()
                //.ForMember(m => m.FormControlBinding, m => m.MapFrom(p => Mapper.Map<FormControlBindingModel>(p.FormControlBinding)))
                //.ForMember(m => m.SubFormDefinition, m => m.MapFrom(p => Mapper.Map<FormDefinitionModel>(p.SubFormDefinition)))
                ;
        }
    }
}
