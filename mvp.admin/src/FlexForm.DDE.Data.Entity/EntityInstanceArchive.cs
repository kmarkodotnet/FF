using NetAppDev.DataAccess.EFCore;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity
{
    public class EntityInstanceArchive : Entity<int>
    {
        public int EntityInstanceId { get; set; }

        public int FormDefinitionId { get; set; }

        public int AuditLogId { get; set; }


        #region Navigation properties

        public EntityInstance EntityInstance { get; set; }

        public FormDefinition FormDefintion { get; set; }

        public AuditLog AuditLog { get; set; }

        public ICollection<FieldValueArchive> FieldValueArchives { get; set; } 

        #endregion
    }
}
