using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class FieldDefinitionModelProfile : Profile
    {
        public FieldDefinitionModelProfile()
        {
            CreateMap<FieldDefinition,FieldDefinitionModel>();
        }
    }
}
