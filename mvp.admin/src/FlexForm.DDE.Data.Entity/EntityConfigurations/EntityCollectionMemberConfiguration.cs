using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class EntityCollectionMemberConfiguration : IEntityTypeConfiguration<EntityCollectionMember>
    {
        public void Configure(EntityTypeBuilder<EntityCollectionMember> builder)
        {
            builder
                .HasKey(table => new { table.FieldValueId, table.EntityInstanceId });
        }
    }
}
