using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class ValidationRuleFormDefinitionConfiguration : IEntityTypeConfiguration<ValidationRuleFormDefinition>
    {
        public void Configure(EntityTypeBuilder<ValidationRuleFormDefinition> builder)
        {
            builder
                .HasKey(table => new { table.ValidationRuleId, table.FormDefinitionId });
        }
    }
}
