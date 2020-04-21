using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class ValidationRuleFormControlBindingConfiguration : IEntityTypeConfiguration<ValidationRuleFormControlBinding>
    {
        public void Configure(EntityTypeBuilder<ValidationRuleFormControlBinding> builder)
        {
            builder
                .HasKey(table => new { table.ValidationRuleId, table.FormControlBindingId });
        }
    }
}
