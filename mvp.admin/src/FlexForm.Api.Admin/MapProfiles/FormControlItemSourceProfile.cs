using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class FormControlItemSourceProfile : Profile
    {
        public FormControlItemSourceProfile()
        {
            CreateMap<FormControlItemSourceModel, FormControlItemSource>()
                .ForMember(m => m.FormControls, m => m.Ignore());
        }
    }
}
