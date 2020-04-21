namespace FlexForm.DDE.Data.Entity
{
    public class EntityCollectionMember
    {
        public int FieldValueId { get; set; }

        public int EntityInstanceId { get; set; }


        #region Navigation properties

        public FieldValue FieldValue { get; set; }

        public EntityInstance EntityInstance { get; set; }

        #endregion
    }
}
