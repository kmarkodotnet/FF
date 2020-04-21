using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class EntityInstanceArchiveConfiguration : IEntityTypeConfiguration<EntityInstanceArchive>
    {
        public void Configure(EntityTypeBuilder<EntityInstanceArchive> builder)
        {
            builder
               .HasKey(p => p.Id);
        }
    }
}
