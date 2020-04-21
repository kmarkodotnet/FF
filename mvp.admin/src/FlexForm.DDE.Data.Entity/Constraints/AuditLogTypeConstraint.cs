using FlexForm.DDE.Common.Enums;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity.Constraints
{
    public class AuditLogTypeConstraint
    {
        public AuditLogType AuditLogType { get; set; }

        public string Name { get; set; }


        #region Navigation properties

        public ICollection<AuditLog> AuditLogs { get; set; }

        #endregion
    }
}
