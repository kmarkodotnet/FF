using FlexForm.Api.Common;
using NetAppDev.Common.Diagnostic;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FlexForm.Api.Admin.Utils
{
    public class RandomEntityHelper
    {
        private readonly string DEFINITION_FOLDER = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
        private const string FILE_NAME = "sentences.txt";

        private readonly IEntityAdminService _entityAdminService;
        private readonly Random _random = new Random(DateTime.Now.Millisecond);
        private readonly List<string> _textSource;

        public RandomEntityHelper(IEntityAdminService entityAdminService)
        {
            _entityAdminService = entityAdminService;
            _textSource = LoadTextSource();
        }

        internal async Task<Dictionary<string, object>> CreateRandomEntity(int entityDefinitionId, int depth)
        {
            var entityDefinition = await _entityAdminService.GetEntityDefinition(entityDefinitionId);
            var entity = new Dictionary<string, object>
            {
                { "entityDefinitionId", entityDefinition.Id },
                { "entityDefinition", entityDefinition.Name }
            };

            foreach (var definition in entityDefinition.FieldDefinitions)
            {
                switch (definition.FieldType)
                {
                    case DDE.Common.Enums.FieldType.Identity:
                        entity[definition.Name] = 1;
                        break;
                    case DDE.Common.Enums.FieldType.Int:
                        entity[definition.Name] = _random.Next();
                        break;
                    case DDE.Common.Enums.FieldType.Double:
                    case DDE.Common.Enums.FieldType.Decimal:
                        entity[definition.Name] = _random.NextDouble();
                        break;
                    case DDE.Common.Enums.FieldType.Text:
                        entity[definition.Name] = _textSource[_random.Next(_textSource.Count)];
                        break;
                    case DDE.Common.Enums.FieldType.DateTime:
                        entity[definition.Name] = DateTime.Now.AddDays(_random.Next(-2000, 1000));
                        break;
                    case DDE.Common.Enums.FieldType.EntityReference:
                        if (depth > 0)
                        {
                            var member = await CreateRandomEntity(definition.ItemSourceDefinition.ItemSourceEntityDefinitionId, depth - 1);
                            entity[definition.Name] = member;
                        }
                        break;
                    case DDE.Common.Enums.FieldType.OuterId:
                        entity[definition.Name] = Guid.NewGuid().ToString();
                        break;
                    case DDE.Common.Enums.FieldType.EntityCollection:
                    case DDE.Common.Enums.FieldType.Collection:
                    case DDE.Common.Enums.FieldType.Association:
                        if (depth > 0)
                        {
                            var collection = new List<object>();
                            for (var i = 1; i < _random.Next(3, 10); i++)
                            {
                                var member = await CreateRandomEntity(definition.ItemSourceDefinition.ItemSourceEntityDefinitionId, depth - 1);
                                collection.Add(member);
                            }
                            entity[definition.Name] = collection;
                        }
                        break;
                    case DDE.Common.Enums.FieldType.Boolean:
                        entity[definition.Name] = _random.Next() % 2;
                        break;
                    case DDE.Common.Enums.FieldType.Calculated:
                        entity[definition.Name] = definition.Expression;
                        break;
                    default:
                        break;
                }
            }

            return entity;
        }

        internal async Task<IEnumerable<Dictionary<string, object>>> CreateRandomEntitySource(int entityDefinitionId, int countElements, int depth)
        {
            var items = Enumerable.Range(0, countElements)
                .Select(i => CreateRandomEntity(entityDefinitionId, depth));
            var result = await Task.WhenAll(items);

            return result;
        }

        private List<string> LoadTextSource()
        {
            Logger.Writer().Info($"Loading text source {FILE_NAME} from {DEFINITION_FOLDER}");
            var text = new List<string>();

            try
            {
                string line;
                using (var file = new StreamReader(Path.Combine(DEFINITION_FOLDER, FILE_NAME)))
                {
                    while ((line = file.ReadLine()) != null)
                    {
                        text.Add(line.Trim());
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Writer().Error("Error in reading text source", ex);
                throw ex;
            }

            return text;
        }
    }
}
