using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class FormControlConfiguration : IEntityTypeConfiguration<FormControl>
    {
        public void Configure(EntityTypeBuilder<FormControl> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Name)
                .HasMaxLength(256);
            builder
                .HasOne(p => p.FormDefinition)
                .WithMany(p => p.FormControls)
                .HasForeignKey(p => p.FormDefinitionId);
            builder
                .HasOne(p => p.FormControlBinding)
                .WithOne(p => p.FormControl)
                .HasForeignKey<FormControlBinding>(p => p.Id);
            builder
                .HasOne(p => p.FormControlItemSource)
                .WithMany(p => p.FormControls)
                .HasForeignKey(p => p.FormControlItemSourceId);
            builder
                .HasOne(p => p.SubFormDefinition)
                .WithMany(p => p.SubFormControls)
                .HasForeignKey(p => p.SubFormDefinitionId);
            builder
                .HasOne(p => p.DisplayTypeConstraint)
                .WithMany(p => p.FormControls)
                .HasForeignKey(p => p.DisplayType);
        }
    }
}
