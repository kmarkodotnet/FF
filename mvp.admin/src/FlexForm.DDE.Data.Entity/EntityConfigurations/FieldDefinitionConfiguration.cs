using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class FieldDefinitionConfiguration : IEntityTypeConfiguration<FieldDefinition>
    {
        public void Configure(EntityTypeBuilder<FieldDefinition> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(100);
            builder
                .HasIndex(p => p.Name)
                .IsUnique();
            builder
                .HasOne(p => p.ItemSourceDefinition)
                .WithMany(p => p.FieldDefinitions)
                .HasForeignKey(p => p.ItemSourceDefinitionId);
            builder
                .HasOne(p => p.FieldTypeConstraint)
                .WithMany(p => p.FieldDefinitions)
                .HasForeignKey(p => p.FieldType);
        }
    }
}
