using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexForm.DDE.Data.Entity.EntityConfigurations
{
    public class FieldValueConfiguration : IEntityTypeConfiguration<FieldValue>
    {
        public void Configure(EntityTypeBuilder<FieldValue> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Ignore(p => p.Value)
                .Ignore(p => p.Collection);
            builder
                .Property(p => p.OuterIdValue)
                .HasMaxLength(128);
            //builder
            //    .HasOne(p => p.EntityInstance)
            //    .WithMany(p => p.FieldValues)
            //    .HasForeignKey(p => p.EntityInstanceId);
            builder
                .HasOne(p => p.ReferencedEntity)
                .WithMany(p => p.EntityReferenceFieldValues)
                .HasForeignKey(p => p.EntityReferenceValue);
        }
    }
}
