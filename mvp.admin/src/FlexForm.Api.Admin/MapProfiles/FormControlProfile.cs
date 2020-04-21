using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class FormControlProfile : Profile
    {
        public FormControlProfile()
        {
            CreateMap<FormControlModel, FormControl>()
                .ForMember(m => m.SubFormDefinition, m => m.Ignore())
                .ForMember(m => m.SubFormDefinitionId, m => m.Ignore())
                .ForMember(m => m.DisplayTypeConstraint, m => m.Ignore())
                .ForMember(m => m.FormDefinition, m => m.Ignore())
                .ForMember(m => m.UiPropertiesText, m => m.Ignore());
        }
    }
}
