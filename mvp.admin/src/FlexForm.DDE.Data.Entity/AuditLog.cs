using FlexForm.DDE.Common.Enums;
using FlexForm.DDE.Data.Entity.Constraints;
using System;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity
{
    /// <summary>
    /// Audit log header class for collectiong the <see cref="EntityInstanceArchive"/> recods. 
    /// Every operation which has same type and happened together, has a common AuditLog and separated <see cref="POC.Model.EntityInstanceArchive"/> records
    /// </summary>
    /// <example>
    /// This method creates AuditLog after a new EntityInstance has created
    /// <code>
    /// public static AuditLog CreateCreatedAuditLog(User user, FormDefinition formDefinition, params EntityInstance[] instances)
    /// {
    ///     if (instances != null)
    ///     {
    ///         foreach (var i in instances)
    ///         {
    ///             var archiveInstance = new EntityInstanceArchive
    ///             {
    ///                 Id = Guid.NewGuid(),
    ///                 EntityInstance = i,
    ///                 FormDefintion = formDefinition
    ///             }
    ///             foreach (var fv in i.FieldValues)
    ///             {
    ///                 archiveInstance.FieldValueArchives.Add(CreateValueArchice(fv));
    ///             }
    ///             log.EntityInstanceArchives.Add(archiveInstance);
    ///         }
    ///     }
    ///     return log;
    /// }
    /// </code>
    /// </example>
    public class AuditLog
    {
        public int Id { get; set; }

        public Guid UserId { get; set; }

        public AuditLogType AuditLogType { get; set; }

        public DateTime EventDate { get; set; }


        #region Navigation properties

        public ICollection<EntityInstanceArchive> EntityInstanceArchives { get; set; } = new HashSet<EntityInstanceArchive>();

        public User User { get; set; }

        public AuditLogTypeConstraint AuditLogTypeConstraint { get; set; }

        #endregion
    }

}
