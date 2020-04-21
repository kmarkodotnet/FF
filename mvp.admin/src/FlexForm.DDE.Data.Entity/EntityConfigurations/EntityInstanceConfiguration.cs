using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class EntityInstanceConfiguration : IEntityTypeConfiguration<EntityInstance>
    {
        public void Configure(EntityTypeBuilder<EntityInstance> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .HasMany(p => p.EntityReferenceFieldValues)
                .WithOne(p => p.ReferencedEntity)
                .HasForeignKey(p => p.EntityReferenceValue);
        }
    }
}
