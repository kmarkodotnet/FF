using NetAppDev.DataAccess.EFCore;
using System.Collections.Generic;
using System.Linq;

namespace FlexForm.DDE.Data.Entity
{
    public class EntityDefinition : Entity<int>
    {
        public string Name { get; set; }

        #region Navigation properties

        public ICollection<FieldDefinition> FieldDefinitions { get; set; }

        public ICollection<FormDefinition> FormDefinitions { get; set; }

        public ICollection<EntityInstance> EntityInstances { get; set; }

        public ICollection<ItemSourceDefinition> ItemSourceDefinitions { get; set; }

        #endregion

        #region NotMapped properties

        public bool HasFormDefinitions { get; set; }

        public bool HasEntityInstances { get; set; }

        #endregion

        #region Methods

        public FieldDefinition GetFieldDefinitionByName(string name)
        {
            return FieldDefinitions.Where(d => d.Name == name).Single();
        }

        #endregion
    }
}
