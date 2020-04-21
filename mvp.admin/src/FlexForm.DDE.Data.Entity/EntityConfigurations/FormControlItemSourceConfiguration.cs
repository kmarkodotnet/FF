using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class FormControlItemSourceConfiguration : IEntityTypeConfiguration<FormControlItemSource>
    {
        public void Configure(EntityTypeBuilder<FormControlItemSource> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Id)
                .UseSqlServerIdentityColumn();
            builder
                .HasMany(p => p.FormControls)
                .WithOne(p => p.FormControlItemSource)
                .HasForeignKey(p => p.FormControlItemSourceId);
        }
    }
}
