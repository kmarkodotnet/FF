using FlexForm.DDE.Data.Entity.Constraints;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.ConstraintConfigurations
{
    public class DisplayTypeConstraintConfiguration : IEntityTypeConfiguration<DisplayTypeConstraint>
    {
        public void Configure(EntityTypeBuilder<DisplayTypeConstraint> builder)
        {
            builder
                .HasKey(p => p.DisplayType);
            builder
                .Property(p => p.DisplayType)
                .ValueGeneratedNever();
            builder
                .Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
