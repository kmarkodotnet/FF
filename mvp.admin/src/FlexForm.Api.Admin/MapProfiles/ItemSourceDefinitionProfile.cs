using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class ItemSourceDefinitionProfile : Profile
    {
        public ItemSourceDefinitionProfile()
        {
            CreateMap<ItemSourceDefinitionModel, ItemSourceDefinition>()
                .ForMember(m => m.FieldDefinitions, m => m.Ignore())
                .ForMember(m => m.ItemSourceEntityDefinition, m => m.Ignore());
        }
    }
}
