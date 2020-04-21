using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.UserName)
                .IsRequired()
                .HasMaxLength(256);
            builder
                .HasMany(p => p.UserGroupMember)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserGroupId);
            builder
                .HasMany(p => p.UserSettings)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId);

            // ASP.NET table mappings
            builder
                .ToTable("AspNetUsers");
            builder
                .Ignore("Timestamp");

        }
    }
}
