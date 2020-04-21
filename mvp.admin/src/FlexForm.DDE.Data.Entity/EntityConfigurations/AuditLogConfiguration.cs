using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
    {
        public void Configure(EntityTypeBuilder<AuditLog> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.EventDate)
                .IsRequired()
                .HasColumnType("Date")
                .HasDefaultValueSql("GetDate()");
            builder
                .HasOne(p => p.AuditLogTypeConstraint)
                .WithMany(p => p.AuditLogs)
                .HasForeignKey(p => p.AuditLogType);
        }
    }
}
