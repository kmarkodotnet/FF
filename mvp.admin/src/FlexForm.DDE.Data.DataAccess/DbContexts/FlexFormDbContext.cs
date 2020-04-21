using FlexForm.DDE.Data.DataAccess.Extensions;
using FlexForm.DDE.Data.Entity;
using FlexForm.DDE.Data.Entity.Constraints;
using Microsoft.EntityFrameworkCore;
using NetAppDev.DataAccess;
using Unity;

namespace FlexForm.DDE.Data.DataAccess.DbContexts
{
    public class FlexFormDbContext : DbContext
    {
        private string _connectionString;

        public FlexFormDbContext(DbContextOptions<FlexFormDbContext> options) : base(options)
        {

        }

        [InjectionConstructor]
        public FlexFormDbContext([Dependency(Connections.FlexFormDDE)] IConnectionFactory flexDataConnectionFactory)
        {
            _connectionString = flexDataConnectionFactory.ConnectionString;
        }

        public DbSet<AuditLog> AuditLogs { get; set; }
        public DbSet<EntityDefinition> EntityDefinitions { get; set; }
        public DbSet<EntityInstance> EntityInstances { get; set; }
        public DbSet<EntityInstanceArchive> EntityInstanceArchives { get; set; }
        public DbSet<FieldDefinition> FieldDefinitions { get; set; }
        public DbSet<FieldValue> FieldValues { get; set; }
        public DbSet<FieldValueArchive> FieldValueArchives { get; set; }
        public DbSet<FormControl> FormControls { get; set; }
        public DbSet<FormControlBinding> FormControlBindings { get; set; }
        public DbSet<FormControlItemSource> FormControlItemSources { get; set; }
        public DbSet<FormDefinition> FormDefinitions { get; set; }
        public DbSet<ItemSourceDefinition> ItemSourceDefinitions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<UserSettings> UserSettings { get; set; }
        public DbSet<ValidationRule> ValidationRules { get; set; }

        // Join tables
        public DbSet<UserGroupMember> UserGroupMembers { get; set; }
        public DbSet<ValidationRuleFieldDefinition> ValidationRuleFieldDefinitions { get; set; }
        public DbSet<ValidationRuleFormControlBinding> ValidationRuleFormControlBindings { get; set; }
        public DbSet<ValidationRuleFormDefinition> ValidationRuleFormDefinitions { get; set; }

        // Enum constraints
        public DbSet<DisplayTypeConstraint> DisplayTypeConstraints { get; set; }
        public DbSet<FormTypeConstraint> FormTypeConstraints { get; set; }
        public DbSet<FieldTypeConstraint> FieldTypeConstraints { get; set; }
        public DbSet<AuditLogTypeConstraint> AuditLogTypeConstraints { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!string.IsNullOrWhiteSpace(_connectionString))
            {
                optionsBuilder.UseSqlServer(_connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ConfigureEntities();
        }
    }
}
