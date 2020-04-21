using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class ValidationRuleConfiguration : IEntityTypeConfiguration<ValidationRule>
    {
        public void Configure(EntityTypeBuilder<ValidationRule> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(256);
            builder
                .Property(p => p.ValidationMethod)
                .IsRequired()
                .HasMaxLength(256);
        }
    }
}
