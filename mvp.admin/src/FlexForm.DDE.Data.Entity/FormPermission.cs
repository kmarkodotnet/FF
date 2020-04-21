using System;

namespace FlexForm.DDE.Data.Entity
{
    public class FormPermission
    {
        public int FormDefinitionId { get; set; }

        public Guid UserGroupId { get; set; }


        #region Navigation properties

        public FormDefinition FormDefinition { get; set; }

        public UserGroup UserGroup { get; set; }

        #endregion
    }
}
