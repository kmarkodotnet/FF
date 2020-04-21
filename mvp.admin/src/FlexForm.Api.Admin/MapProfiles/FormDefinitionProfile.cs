using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class FormDefinitionProfile : Profile
    {
        public FormDefinitionProfile()
        {
            CreateMap<FormDefinitionModel, FormDefinition>()
                .ForMember(m => m.EntityDefinition, m => m.Ignore())
                .ForMember(m => m.EntityInstanceArchives, m => m.Ignore())
                .ForMember(m => m.FormPermissions, m => m.Ignore())
                .ForMember(m => m.FormTypeConstraint, m => m.Ignore())
                .ForMember(m => m.UiPropertiesText, m => m.Ignore())
                .ForMember(m => m.SubFormControls, m => m.Ignore())
                .ForMember(m => m.ValidationRuleFormDefinitions, m => m.Ignore());
        }
    }
}
