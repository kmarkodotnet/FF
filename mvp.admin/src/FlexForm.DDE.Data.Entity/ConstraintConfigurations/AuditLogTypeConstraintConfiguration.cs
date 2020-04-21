using FlexForm.DDE.Data.Entity.Constraints;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.ConstraintConfigurations
{
    public class AuditLogTypeConstraintConfiguration : IEntityTypeConfiguration<AuditLogTypeConstraint>
    {
        public void Configure(EntityTypeBuilder<AuditLogTypeConstraint> builder)
        {
            builder
                .HasKey(p => p.AuditLogType);
            builder
                .Property(p => p.AuditLogType)
                .ValueGeneratedNever();
            builder
                .Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
