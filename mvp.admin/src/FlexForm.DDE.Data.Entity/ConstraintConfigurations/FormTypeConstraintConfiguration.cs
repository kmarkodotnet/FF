using FlexForm.DDE.Data.Entity.Constraints;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.ConstraintConfigurations
{
    public class FormTypeConstraintConfiguration : IEntityTypeConfiguration<FormTypeConstraint>
    {
        public void Configure(EntityTypeBuilder<FormTypeConstraint> builder)
        {
            builder
                .HasKey(p => p.FormType);
            builder
                .Property(p => p.FormType)
                .ValueGeneratedNever();
            builder
                .Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
