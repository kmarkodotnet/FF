using FlexForm.Api.Admin.Model;
using FlexForm.DDE.Common.Enums;
using System.Collections.Generic;
using System.Linq;

namespace FlexForm.Api.Admin.Utils
{
    public class FormDefinitionHelper
    {

        public static Dictionary<string, object> GetFormWithEntityReferenceAndEntityCollection()
        {
            return new Dictionary<string, object>
            {
                { "EntityDefinitions", new[] { GetPersonDefinition(), GetGenderDefinition(), GetSportActivityDefinition() } },
                { "Person", GetPersonInstance() },
                { "Genders", GetGenderInstances() },
                { "SportActivities", GetSportInstances() },
                { "PersonForm", GetPersonForm() }
            };
        }

        private static EntityDefinitionModel GetPersonDefinition()
        {
            return new EntityDefinitionModel
            {
                FieldDefinitions = new[]
                {
                    new FieldDefinitionModel
                    {
                        Id = 11,
                        EntityDefinitionId = 1,
                        Name = "FullName",
                        FieldType = FieldType.Text,
                    },
                    new FieldDefinitionModel
                    {
                        Id = 12,
                        EntityDefinitionId = 1,
                        Name = "Gender",
                        FieldType = FieldType.EntityReference,
                        ItemSourceDefinition = new ItemSourceDefinitionModel
                        {
                            Id = 121,
                            Name = "GenderSource",
                            ItemSourceEntityDefinitionId = 2,
                            IncludeProperties = "GenderName",
                            IsSingleResult = true,
                        }
                    },
                    new FieldDefinitionModel
                    {
                        Id = 13,
                        EntityDefinitionId = 1,
                        Name = "Sports",
                        FieldType = FieldType.EntityCollection,
                        ItemSourceDefinition = new ItemSourceDefinitionModel
                        {
                            Id = 131,
                            Name = "SportActivityCollection",
                            ItemSourceEntityDefinitionId = 3,
                            IncludeProperties = "ActivityName",
                            IsSingleResult = false,
                        },
                    }
                },
                HasEntityInstances = true,
                HasFormDefinitions = true,
                Id = 1,
                Name = "Person"
            };
        }

        private static EntityDefinitionModel GetGenderDefinition()
        {
            return new EntityDefinitionModel
            {
                FieldDefinitions = new[]
                {
                    new FieldDefinitionModel
                    {
                        Id = 21,
                        EntityDefinitionId = 2,
                        Name = "GenderName",
                        FieldType = FieldType.Text,
                    }
                },
                HasEntityInstances = true,
                HasFormDefinitions = true,
                Id = 2,
                Name = "Gender"
            };
        }

        private static EntityDefinitionModel GetSportActivityDefinition()
        {
            return new EntityDefinitionModel
            {
                FieldDefinitions = new[]
                {
                    new FieldDefinitionModel
                    {
                        Id = 31,
                        EntityDefinitionId = 3,
                        Name = "ActivityName",
                        FieldType = FieldType.Text,
                    },
                    new FieldDefinitionModel
                    {
                        Id = 32,
                        EntityDefinitionId = 3,
                        Name = "IsTeamSport",
                        FieldType = FieldType.Boolean,
                    }
                },
                HasEntityInstances = true,
                HasFormDefinitions = true,
                Id = 3,
                Name = "SportActivity"
            };
        }

        private static Dictionary<string, object> GetPersonInstance()
        {
            return new Dictionary<string, object>
            {
                { "Id", 1001 },
                { "EntityDefinitionId", 1 },
                { "Name", "John Test" },
                { "Gender", GetGenderInstances().First() },
                { "Sports", GetSportInstances().Take(3) },
            };
        }

        private static List<Dictionary<string, object>> GetGenderInstances()
        {
            return new List<Dictionary<string, object>>
            {
                new Dictionary<string, object>
                {
                    { "Id", 2001 },
                    { "EntityDefinitionId", 2 },
                    { "GenderName", "Male" }
                },
                new Dictionary<string, object>
                {
                    { "Id", 2002 },
                    { "EntityDefinitionId", 2 },
                    { "GenderName", "Female" }
                },
                new Dictionary<string, object>
                {
                    { "Id", 2003 },
                    { "EntityDefinitionId", 2 },
                    { "GenderName", "N/A" }
                },
            };
        }

        private static List<Dictionary<string, object>> GetSportInstances()
        {
            return new List<Dictionary<string, object>>
            {
                new Dictionary<string, object>
                {
                    { "Id", 3001 },
                    { "EntityDefinitionId", 3 },
                    { "ActivityName", "Soccer" },
                    { "", true },
                },
                new Dictionary<string, object>
                {
                    { "Id", 3002 },
                    { "EntityDefinitionId", 3 },
                    { "ActivityName", "Hiking" },
                    { "", false },
                },
                new Dictionary<string, object>
                {
                    { "Id", 3003 },
                    { "EntityDefinitionId", 3 },
                    { "ActivityName", "Handball" },
                    { "", true },
                },
                new Dictionary<string, object>
                {
                    { "Id", 3004 },
                    { "EntityDefinitionId", 3 },
                    { "ActivityName", "Cycling" },
                    { "", false },
                },
                new Dictionary<string, object>
                {
                    { "Id", 3005 },
                    { "EntityDefinitionId", 3 },
                    { "ActivityName", "Fitness" },
                    { "", false },
                },
                new Dictionary<string, object>
                {
                    { "Id", 3006 },
                    { "EntityDefinitionId", 3 },
                    { "ActivityName", "Ice Hockey" },
                    { "", true },
                },
            };
        }

        private static FormDefinitionModel GetPersonForm()
        {
            return new FormDefinitionModel
            {
                Description = "Reference Form Definition",
                EntityDefinitionId = 1,
                FormControls = new[]
                {
                    new FormControlModel
                    {
                        DisplayType = DisplayType.Text,
                        FormControlBinding = new FormControlBindingModel
                        {
                            FieldDefinitionId = 11,
                            Id = 501,
                            IsReadOnly = false,
                            IsInvalidStateEnabled = true,
                        },
                        FormDefinitionId = 50,
                        Name = "FullName",
                    },
                    new FormControlModel
                    {
                        DisplayType = DisplayType.ComboBox,
                        FormControlBinding = new FormControlBindingModel
                        {
                            FieldDefinitionId = 12,
                            Id = 502,
                            IsReadOnly = false,
                            IsInvalidStateEnabled = true,
                        },
                        FormControlItemSource = new FormControlItemSourceModel
                        {
                            Id = 521,
                            IncludeProperties = "Name",
                            ItemSourceCondition = "",
                            ItemSourceOrder = "Name",
                            PageSize = 10
                        },
                        FormDefinitionId = 50,
                        Name = "Gender",
                    },
                    new FormControlModel
                    {
                        DisplayType = DisplayType.ListBox,
                        FormControlBinding = new FormControlBindingModel
                        {
                            FieldDefinitionId = 13,
                            Id = 503,
                            IsReadOnly = false,
                            IsInvalidStateEnabled = true,
                        },
                        FormControlItemSource = new FormControlItemSourceModel
                        {
                            Id = 531,
                            IncludeProperties = "Name",
                            ItemSourceCondition = "",
                            ItemSourceOrder = "Name",
                            PageSize = 10
                        },
                        FormDefinitionId = 50,
                        Name = "PreferedSports",
                    },
                },
                FormName = "Person Form",
                FormType = FormType.Edit,
                HasEntityInstances = true,
                Id = 50,
                IsInvalidStateEnabled = false,
                IsRootForm = true,
                Title = "Edit Person",
            };
        }
    }
}
