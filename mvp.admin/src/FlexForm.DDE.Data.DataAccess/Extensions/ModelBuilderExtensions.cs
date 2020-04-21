using FlexForm.DDE.Data.Entity;
using FlexForm.DDE.Data.Entity.Constraints;
using Microsoft.EntityFrameworkCore;
using NetAppDev.DataAccess.EFCore.Extensions;

namespace FlexForm.DDE.Data.DataAccess.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void ConfigureEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.RemovePluralizingTableNameConvention();
            modelBuilder.RemoveCascadeDeleteConvention();
            modelBuilder.MarkTimestampColumnConcurrencyToken();

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(EntityDefinition).Assembly);

            modelBuilder.Entity<AuditLogTypeConstraint>().ToTable("AuditLogTypeConstraint", "enum");
            modelBuilder.Entity<DisplayTypeConstraint>().ToTable("DisplayTypeConstraint", "enum");
            modelBuilder.Entity<FieldTypeConstraint>().ToTable("FieldTypeConstraint", "enum");
            modelBuilder.Entity<FormTypeConstraint>().ToTable("FormTypeConstraint", "enum");
        }
    }
}
