using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class EntityDefinitionModelProfile:Profile
    {
        public EntityDefinitionModelProfile()
        {
            CreateMap<EntityDefinition, EntityDefinitionModel>();
        }

    }
}
