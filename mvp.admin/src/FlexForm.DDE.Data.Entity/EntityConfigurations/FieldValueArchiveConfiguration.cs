using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class FieldValueArchiveConfiguration : IEntityTypeConfiguration<FieldValueArchive>
    {
        public void Configure(EntityTypeBuilder<FieldValueArchive> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Ignore(p => p.OriginalValue);
        }
    }
}
