using AutoMapper;
using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Data.Entity;

namespace FlexForm.Api.Admin.MapProfiles
{
    public class FormControlBindingModelProfile : Profile
    {
        public FormControlBindingModelProfile()
        {
            CreateMap<FormControlBinding, FormControlBindingModel>();
        }
    }
}
