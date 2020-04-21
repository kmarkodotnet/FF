using NetAppDev.DataAccess.EFCore;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity
{
    public class ItemSourceDefinition : Entity<int>
    {
        public string Name { get; set; }

        public int ItemSourceEntityDefinitionId { get; set; }

        public bool IsSingleResult { get; set; }

        public string ItemSourceCondition { get; set; }

        public string ItemSourceDefaultOrder { get; set; }

        public string IncludeProperties { get; set; }

        public int PageSize { get; set; }


        #region Navigation properties

        public EntityDefinition ItemSourceEntityDefinition { get; set; }

        public ICollection<FieldDefinition> FieldDefinitions { get; set; }

        #endregion
    }
}
