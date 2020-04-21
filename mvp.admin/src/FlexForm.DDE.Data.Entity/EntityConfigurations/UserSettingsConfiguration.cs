using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class UserSettingsConfiguration
    {
        public void Configure(EntityTypeBuilder<UserSettings> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .HasOne(p => p.User)
                .WithMany(p => p.UserSettings)
                .HasForeignKey(p => p.UserId);
        }
    }
}
