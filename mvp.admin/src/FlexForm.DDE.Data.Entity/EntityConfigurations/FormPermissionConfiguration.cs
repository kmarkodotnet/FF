using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class FormPermissionConfiguration : IEntityTypeConfiguration<FormPermission>
    {
        public void Configure(EntityTypeBuilder<FormPermission> builder)
        {
            builder
                .HasKey(table => new { table.FormDefinitionId, table.UserGroupId });

            builder
                .HasOne(p => p.FormDefinition)
                .WithMany(p => p.FormPermissions)
                .HasForeignKey(p => p.FormDefinitionId);
            builder
                .HasOne(p => p.UserGroup)
                .WithMany(p => p.FormPermissions)
                .HasForeignKey(p => p.UserGroupId);
        }
    }
}
