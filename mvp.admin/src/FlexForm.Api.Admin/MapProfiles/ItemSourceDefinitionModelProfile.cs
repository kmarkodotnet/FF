using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class ItemSourceDefinitionModelProfile : Profile
    {
        public ItemSourceDefinitionModelProfile()
        {
            CreateMap<ItemSourceDefinition, ItemSourceDefinitionModel>();
        }
    }
}
