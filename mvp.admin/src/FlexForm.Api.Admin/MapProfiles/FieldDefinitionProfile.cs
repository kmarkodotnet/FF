using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class FieldDefinitionProfile : Profile
    {
        public FieldDefinitionProfile()
        {
            CreateMap<FieldDefinitionModel, FieldDefinition>()
                .ForMember(m => m.EntityDefinition, m => m.Ignore())
                .ForMember(m => m.FieldTypeConstraint, m => m.Ignore())
                .ForMember(m => m.FieldValues, m => m.Ignore())
                .ForMember(m => m.FormControlBindings, m => m.Ignore())
                .ForMember(m => m.ValidationRuleFieldDefinitions, m => m.Ignore());
        }
    }
}
