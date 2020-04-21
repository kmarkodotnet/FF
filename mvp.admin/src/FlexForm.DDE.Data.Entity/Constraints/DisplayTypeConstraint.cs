using FlexForm.DDE.Common.Enums;
using System.Collections.Generic;

namespace FlexForm.DDE.Data.Entity.Constraints
{
    public class DisplayTypeConstraint
    {
        public DisplayType DisplayType { get; set; }

        public string Name { get; set; }


        #region Navigation properties

        public ICollection<FormControl> FormControls { get; set; }

        #endregion
    }
}
