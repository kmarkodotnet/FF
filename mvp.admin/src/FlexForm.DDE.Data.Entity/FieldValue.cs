using FlexForm.DDE.Common.Enums;
using NetAppDev.DataAccess.EFCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity
{
    public class FieldValue : Entity<int>
    {
        public int FieldDefinitionId { get; set; }

        public int EntityInstanceId { get; set; }

        [JsonIgnore]
        public object Value
        {
            get
            {
                if (FieldDefinition == null)
                {
                    throw new Exception(string.Format("{0} is not initialized properly, FieldDefinition field has not set", GetType().Name));
                }
                switch (FieldDefinition.FieldType)
                {
                    case FieldType.Boolean:
                        return BoolValue;
                    case FieldType.Int:
                        return IntValue;
                    case FieldType.Double:
                        return DoubleValue;
                    case FieldType.Decimal:
                        return DecimalValue;
                    case FieldType.Text:
                        return StringValue;
                    case FieldType.DateTime:
                        return DateTimeValue;
                    case FieldType.EntityReference:
                        return EntityReferenceValue;
                    case FieldType.OuterId:
                        return OuterIdValue;
                    case FieldType.Calculated:
                        return null;
                    default:
                        return null;
                }
            }
            set
            {
                switch (FieldDefinition.FieldType)
                {
                    case FieldType.Boolean:
                        BoolValue = value as bool?;
                        break;
                    case FieldType.Int:
                        IntValue = value as int?;
                        break;
                    case FieldType.Double:
                        DoubleValue = value as double?;
                        break;
                    case FieldType.Decimal:
                        DecimalValue = value as decimal?;
                        break;
                    case FieldType.Text:
                        StringValue = value as string;
                        break;
                    case FieldType.DateTime:
                        DateTimeValue = value as DateTime?;
                        break;
                    case FieldType.EntityReference:
                        EntityReferenceValue = value as int?;
                        break;
                    case FieldType.OuterId:
                        OuterIdValue = value as string;
                        break;
                    case FieldType.Calculated:
                        break;
                    default:
                        break;
                }
            }
        }

        public DateTime? DateTimeValue { get; set; }

        public decimal? DecimalValue { get; set; }

        public double? DoubleValue { get; set; }

        public int? IntValue { get; set; }

        public bool? BoolValue { get; set; }

        public string OuterIdValue { get; set; }

        public string StringValue { get; set; }

        public int? EntityReferenceValue { get; set; }


        #region Navigation properties

        public FieldDefinition FieldDefinition { get; set; }

        public EntityInstance EntityInstance { get; set; }

        public EntityInstance ReferencedEntity { get; set; }

        public ICollection<FieldValueArchive> FieldValueArchives { get; set; } 

        public ICollection<EntityCollectionMember> EntityCollectionMembers { get; set; } 

        /// <summary>
        /// Storage for virtual collection if the FieldType is Collection.
        /// The content of the collection requested by the FieldDefinition.ItemSourceDefinition
        /// </summary>
        public IEnumerable<EntityInstance> Collection { get; set; }

        #endregion
    }
}
