using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class EntityDefinitionConfiguration : IEntityTypeConfiguration<EntityDefinition>
    {
        public void Configure(EntityTypeBuilder<EntityDefinition> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(255);
            builder
                .HasIndex(p => p.Name)
                .IsUnique();
            builder
                .Ignore(p => p.HasEntityInstances)
                .Ignore(p => p.HasFormDefinitions);

        }
    }
}
