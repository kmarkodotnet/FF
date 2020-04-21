using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class UserGroupMemberConfiguration : IEntityTypeConfiguration<UserGroupMember>
    {
        public void Configure(EntityTypeBuilder<UserGroupMember> builder)
        {
            builder
                .HasKey(table => new { table.UserId, table.UserGroupId });

            // ASP.NET table mappings
            builder
                .ToTable("AspNetUserRoles");
            builder
                .Property(p => p.UserGroupId)
                .HasColumnName("RoleId");
            builder
                .HasOne(p => p.User)
                .WithMany(p => p.UserGroupMember)
                .HasForeignKey(p => p.UserId);
            builder
                .HasOne(p => p.UserGroup)
                .WithMany(p => p.UserGroupMembers)
                .HasForeignKey(p => p.UserGroupId);
        }
    }
}
