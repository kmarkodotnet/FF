using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class EntityDefinitionProfile : Profile
    {
        public EntityDefinitionProfile()
        {
            CreateMap<EntityDefinitionModel, EntityDefinition>()
                .ForMember(m => m.EntityInstances, m => m.Ignore())
                .ForMember(m => m.FormDefinitions, m => m.Ignore())
                .ForMember(m => m.ItemSourceDefinitions, m => m.Ignore());
        }
    }
}
