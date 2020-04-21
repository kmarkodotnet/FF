using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class ItemSourceDefinitionConfiguration : IEntityTypeConfiguration<ItemSourceDefinition>
    {
        public void Configure(EntityTypeBuilder<ItemSourceDefinition> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Id)
                .UseSqlServerIdentityColumn();
            builder
                .Property(p => p.Name)
                .HasMaxLength(255);
            builder
                .HasMany(p => p.FieldDefinitions)
                .WithOne(p => p.ItemSourceDefinition)
                .HasForeignKey(p => p.ItemSourceDefinitionId);
        }
    }
}
