using FlexForm.DDE.Data.Entity.Constraints;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.ConstraintConfigurations
{
    public class FieldTypeConstraintConfiguration : IEntityTypeConfiguration<FieldTypeConstraint>
    {
        public void Configure(EntityTypeBuilder<FieldTypeConstraint> builder)
        {
            builder
                .HasKey(p => p.FieldType);
            builder
                .Property(p => p.FieldType)
                .ValueGeneratedNever();
            builder
                .Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
