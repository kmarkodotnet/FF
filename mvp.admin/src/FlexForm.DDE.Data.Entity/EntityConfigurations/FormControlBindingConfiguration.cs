using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class FormControlBindingConfiguration : IEntityTypeConfiguration<FormControlBinding>
    {
        public void Configure(EntityTypeBuilder<FormControlBinding> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Id)
                .ValueGeneratedNever();
            builder
                .HasOne(p => p.FormControl)
                .WithOne(p => p.FormControlBinding)
                .HasForeignKey<FormControl>(p => p.Id);
        }
    }
}
