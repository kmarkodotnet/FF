using Microsoft.Extensions.DependencyInjection;
using NetAppDev.Common.Extensions;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace FlexForm.WebApi.Config
{
    public static class JsonSerializerConfig
    {
        public static IMvcBuilder ConfigureJson(this IMvcBuilder mvcBuilder)
        {
            mvcBuilder
                .AddJsonOptions(options =>
                {
                    var settings = options.SerializerSettings;
                    var defaultSetting = JsonTool.SerializerSettings;

                    settings.NullValueHandling = NullValueHandling.Ignore;

                    //settings.CheckAdditionalContent = defaultSetting.CheckAdditionalContent;
                    //settings.ConstructorHandling = defaultSetting.ConstructorHandling;
                    //settings.Culture = defaultSetting.Culture;
                    //settings.DateFormatHandling = defaultSetting.DateFormatHandling;
                    //settings.DateFormatString = defaultSetting.DateFormatString;
                    //settings.DateParseHandling = defaultSetting.DateParseHandling;
                    //settings.DateTimeZoneHandling = defaultSetting.DateTimeZoneHandling;
                    //settings.DefaultValueHandling = defaultSetting.DefaultValueHandling;
                    //settings.EqualityComparer = defaultSetting.EqualityComparer;
                    //settings.FloatFormatHandling = defaultSetting.FloatFormatHandling;
                    //settings.FloatParseHandling = defaultSetting.FloatParseHandling;
                    //settings.Formatting = defaultSetting.Formatting;
                    //settings.MaxDepth = defaultSetting.MaxDepth;
                    //settings.MetadataPropertyHandling = defaultSetting.MetadataPropertyHandling;
                    //settings.MissingMemberHandling = defaultSetting.MissingMemberHandling;
                    //settings.NullValueHandling = defaultSetting.NullValueHandling;
                    //settings.ObjectCreationHandling = defaultSetting.ObjectCreationHandling;
                    //settings.PreserveReferencesHandling = defaultSetting.PreserveReferencesHandling;
                    //settings.ReferenceLoopHandling = defaultSetting.ReferenceLoopHandling;
                    //settings.StringEscapeHandling = defaultSetting.StringEscapeHandling;
                    //settings.TypeNameAssemblyFormatHandling = defaultSetting.TypeNameAssemblyFormatHandling;
                    //settings.TypeNameHandling = defaultSetting.TypeNameHandling;
                    //settings.TraceWriter
                    //settings.ReferenceResolver
                    //settings.ReferenceResolverProvider
                    //settings.SerializationBinder
                    //settings.ContractResolver = defaultSetting.ContractResolver;
                    //settings.Converters = defaultSetting.Converters != null && defaultSetting.Converters.Any()
                    //    ? new List<JsonConverter>(defaultSetting.Converters)
                    //    : new List<JsonConverter>();
                });

            return mvcBuilder;
        }
    }
}
