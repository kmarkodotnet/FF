namespace FlexForm.DDE.Common.Enums
{
    /// <summary>
    /// Enum of the possible audit log types
    /// </summary>
    /// <seealso cref="POC.Model.AuditLog"/>
    public enum AuditLogType
    {
        /// <summary>
        /// User logged in
        /// </summary>
        Login = 0,

        /// <summary>
        /// User logged out
        /// </summary>
        Logout = 1,

        /// <summary>
        /// Entity has created
        /// </summary>
        EntityCreate = 2,

        /// <summary>
        /// Entity has modified
        /// </summary>
        EntityModify = 3,

        /// <summary>
        /// Entity has deleted
        /// </summary>
        EntityDelete = 4,
    }
}
