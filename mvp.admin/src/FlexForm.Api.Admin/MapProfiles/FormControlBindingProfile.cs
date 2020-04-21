using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class FormControlBindingProfile : Profile
    {
        public FormControlBindingProfile()
        {
            CreateMap<FormControlBindingModel, FormControlBinding>()
                .ForMember(m => m.FieldDefinition, m => m.Ignore())
                .ForMember(m => m.FormControl, m => m.Ignore())
                .ForMember(m => m.UiPropertiesText, m => m.Ignore())
                .ForMember(m => m.ValidationRuleFormControlBindings, m => m.Ignore());
        }
    }
}
