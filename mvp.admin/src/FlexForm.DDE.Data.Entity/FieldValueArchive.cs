using FlexForm.DDE.Common.Enums;
using NetAppDev.DataAccess.EFCore;
using System;

namespace FlexForm.DDE.Data.Entity
{
    public class FieldValueArchive : Entity<int>
    {
        public int EntityInstanceArchiveId { get; set; }

        public int FieldValueId { get; set; }

        #region Original values
        public object OriginalValue
        {
            get
            {
                switch (FieldValue.FieldDefinition.FieldType)
                {
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
                switch (FieldValue.FieldDefinition.FieldType)
                {
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

        public int? IntValue { get; set; }

        public double? DoubleValue { get; set; }

        public decimal? DecimalValue { get; set; }

        public string StringValue { get; set; }

        public DateTime? DateTimeValue { get; set; }

        public int? EntityReferenceValue { get; set; }

        public string OuterIdValue { get; set; }
        #endregion


        #region Navigation properties

        public EntityInstanceArchive EntityInstanceArchive { get; set; }

        public FieldValue FieldValue { get; set; }

        #endregion
    }
}
