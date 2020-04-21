using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class FormDefinitionConfiguration : IEntityTypeConfiguration<FormDefinition>
    {
        public void Configure(EntityTypeBuilder<FormDefinition> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.FormName)
                .IsRequired()
                .HasMaxLength(255);
            builder
                .HasIndex(p => p.FormName)
                .IsUnique();
            builder
                .Property(p => p.Title)
                .HasMaxLength(255);
            builder
                .HasOne(p => p.FormTypeConstraint)
                .WithMany(p => p.FormDefinitions)
                .HasForeignKey(p => p.FormType);
            builder
                .Ignore(p => p.HasEntityInstances);
        }
    }
}
