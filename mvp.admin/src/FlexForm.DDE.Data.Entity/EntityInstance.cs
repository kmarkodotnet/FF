using NetAppDev.DataAccess.EFCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FlexForm.DDE.Data.Entity
{
    public class EntityInstance : Entity<int>
    {
        private Dictionary<string, FieldValue> _fieldValueDictionary;

        public int EntityDefinitionId { get; set; }

        public bool IsValid { get; set; }


        #region Navigation properties

        public EntityDefinition EntityDefinition { get; set; }

        public ICollection<FieldValue> FieldValues { get; } 

        public ICollection<EntityInstanceArchive> EntityInstanceArchives { get; set; } 

        public ICollection<FieldValue> EntityReferenceFieldValues { get; set; }

        public ICollection<EntityCollectionMember> EntityCollectionMembers { get; set; } 

        #endregion

        #region Methods
        /// <summary>
        /// Gets the <see cref="FieldValue"/> of the current instance by its name
        /// </summary>
        /// <param name="fieldName">Name of the requested field</param>
        /// <returns><see cref="FieldValue"/> which containt the value of the field with the requested name</returns>
        /// <exception cref="System.ArgumentException">Happens if the requested field does not exist or has not loaded</exception>
        public FieldValue GetFieldValue(string fieldName)
        {
            if (_fieldValueDictionary == null)
            {
                _fieldValueDictionary = FieldValues.ToDictionary(f => f.FieldDefinition.Name);
            }
            if (_fieldValueDictionary.ContainsKey(fieldName))
            {
                return _fieldValueDictionary[fieldName];
            }
            else
            {
                throw new ArgumentException("Field {0} does not exist or has not loaded");
            }
        }
        #endregion
    }
}
