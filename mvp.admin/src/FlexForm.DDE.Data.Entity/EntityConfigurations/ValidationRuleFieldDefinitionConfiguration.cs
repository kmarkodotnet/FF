using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class ValidationRuleFieldDefinitionConfiguration : IEntityTypeConfiguration<ValidationRuleFieldDefinition>
    {
        public void Configure(EntityTypeBuilder<ValidationRuleFieldDefinition> builder)
        {
            builder
                 .HasKey(table => new { table.ValidationRuleId, table.FieldDefinitionId });
        }
    }
}
