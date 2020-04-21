using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class UserGroupConfiguration : IEntityTypeConfiguration<UserGroup>
    {
        public void Configure(EntityTypeBuilder<UserGroup> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(256);
            builder
                .HasMany(p => p.UserGroupMembers)
                .WithOne(p => p.UserGroup)
                .HasForeignKey(p => p.UserGroupId);
            builder
                .HasMany(p => p.FormPermissions)
                .WithOne(p => p.UserGroup)
                .HasForeignKey(p => p.UserGroupId);

            // ASP.NET table mappings
            builder
                .ToTable("AspNetRoles");
            builder
                .Ignore("Timestamp");
        }
    }
}
