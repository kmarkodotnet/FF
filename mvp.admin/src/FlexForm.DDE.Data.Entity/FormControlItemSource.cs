using NetAppDev.DataAccess.EFCore;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity
{
    public class FormControlItemSource : Entity<int>
    {
        public string ItemSourceCondition { get; set; }

        public string ItemSourceOrder { get; set; }

        public string IncludeProperties { get; set; }

        public int PageSize { get; set; }


        #region Navigation properties

        public ICollection<FormControl> FormControls { get; set; }

        #endregion
    }
}
