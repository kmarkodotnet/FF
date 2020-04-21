using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlexForm.DDE.Data.DataAccess.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "enum");

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: false),
                    LastName = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EntityDefinition",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Name = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityDefinition", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ValidationRule",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    ValidationMethod = table.Column<string>(maxLength: 256, nullable: false),
                    Parameter = table.Column<string>(nullable: true),
                    ValidationErrorMessage = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValidationRule", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditLogTypeConstraint",
                schema: "enum",
                columns: table => new
                {
                    AuditLogType = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogTypeConstraint", x => x.AuditLogType);
                });

            migrationBuilder.CreateTable(
                name: "DisplayTypeConstraint",
                schema: "enum",
                columns: table => new
                {
                    DisplayType = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DisplayTypeConstraint", x => x.DisplayType);
                });

            migrationBuilder.CreateTable(
                name: "FieldTypeConstraint",
                schema: "enum",
                columns: table => new
                {
                    FieldType = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldTypeConstraint", x => x.FieldType);
                });

            migrationBuilder.CreateTable(
                name: "FormTypeConstraint",
                schema: "enum",
                columns: table => new
                {
                    FormType = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormTypeConstraint", x => x.FormType);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    RoleId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EntityInstance",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    EntityDefinitionId = table.Column<int>(nullable: false),
                    IsValid = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityInstance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityInstance_EntityDefinition_EntityDefinitionId",
                        column: x => x.EntityDefinitionId,
                        principalTable: "EntityDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ItemSourceDefinition",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Name = table.Column<string>(maxLength: 255, nullable: true),
                    ItemSourceEntityDefinitionId = table.Column<int>(nullable: false),
                    IsSingleResult = table.Column<bool>(nullable: false),
                    ItemSourceCondition = table.Column<string>(nullable: true),
                    ItemSourceDefaultOrder = table.Column<string>(nullable: true),
                    IncludeProperties = table.Column<string>(nullable: true),
                    PageSize = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemSourceDefinition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemSourceDefinition_EntityDefinition_ItemSourceEntityDefinitionId",
                        column: x => x.ItemSourceEntityDefinitionId,
                        principalTable: "EntityDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AuditLog",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<Guid>(nullable: false),
                    AuditLogType = table.Column<int>(nullable: false),
                    EventDate = table.Column<DateTime>(type: "Date", nullable: false, defaultValueSql: "GetDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLog", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditLog_AuditLogTypeConstraint_AuditLogType",
                        column: x => x.AuditLogType,
                        principalSchema: "enum",
                        principalTable: "AuditLogTypeConstraint",
                        principalColumn: "AuditLogType",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AuditLog_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FormDefinition",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    EntityDefinitionId = table.Column<int>(nullable: true),
                    FormName = table.Column<string>(maxLength: 255, nullable: false),
                    Title = table.Column<string>(maxLength: 255, nullable: true),
                    Description = table.Column<string>(nullable: true),
                    FormType = table.Column<int>(nullable: false),
                    IsRootForm = table.Column<bool>(nullable: false),
                    IsInvalidStateEnabled = table.Column<bool>(nullable: false),
                    UiProperties = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormDefinition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormDefinition_EntityDefinition_EntityDefinitionId",
                        column: x => x.EntityDefinitionId,
                        principalTable: "EntityDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FormDefinition_FormTypeConstraint_FormType",
                        column: x => x.FormType,
                        principalSchema: "enum",
                        principalTable: "FormTypeConstraint",
                        principalColumn: "FormType",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FieldDefinition",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    EntityDefinitionId = table.Column<int>(nullable: false),
                    ItemSourceDefinitionId = table.Column<int>(nullable: true),
                    FieldType = table.Column<int>(nullable: false),
                    Expression = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldDefinition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FieldDefinition_EntityDefinition_EntityDefinitionId",
                        column: x => x.EntityDefinitionId,
                        principalTable: "EntityDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FieldDefinition_FieldTypeConstraint_FieldType",
                        column: x => x.FieldType,
                        principalSchema: "enum",
                        principalTable: "FieldTypeConstraint",
                        principalColumn: "FieldType",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FieldDefinition_ItemSourceDefinition_ItemSourceDefinitionId",
                        column: x => x.ItemSourceDefinitionId,
                        principalTable: "ItemSourceDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EntityInstanceArchive",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    EntityInstanceId = table.Column<int>(nullable: false),
                    FormDefinitionId = table.Column<int>(nullable: false),
                    AuditLogId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityInstanceArchive", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityInstanceArchive_AuditLog_AuditLogId",
                        column: x => x.AuditLogId,
                        principalTable: "AuditLog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityInstanceArchive_EntityInstance_EntityInstanceId",
                        column: x => x.EntityInstanceId,
                        principalTable: "EntityInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityInstanceArchive_FormDefinition_FormDefinitionId",
                        column: x => x.FormDefinitionId,
                        principalTable: "FormDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FormControl",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    FormDefinitionId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    DisplayType = table.Column<int>(nullable: false),
                    ItemSourceDefinitionId = table.Column<int>(nullable: true),
                    ContainerFormDefinitionId = table.Column<int>(nullable: true),
                    UiProperties = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormControl", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormControl_FormDefinition_ContainerFormDefinitionId",
                        column: x => x.ContainerFormDefinitionId,
                        principalTable: "FormDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FormControl_DisplayTypeConstraint_DisplayType",
                        column: x => x.DisplayType,
                        principalSchema: "enum",
                        principalTable: "DisplayTypeConstraint",
                        principalColumn: "DisplayType",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormControl_FormDefinition_FormDefinitionId",
                        column: x => x.FormDefinitionId,
                        principalTable: "FormDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormControl_ItemSourceDefinition_ItemSourceDefinitionId",
                        column: x => x.ItemSourceDefinitionId,
                        principalTable: "ItemSourceDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FormPermission",
                columns: table => new
                {
                    FormDefinitionId = table.Column<int>(nullable: false),
                    UserGroupId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormPermission", x => new { x.FormDefinitionId, x.UserGroupId });
                    table.ForeignKey(
                        name: "FK_FormPermission_FormDefinition_FormDefinitionId",
                        column: x => x.FormDefinitionId,
                        principalTable: "FormDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FormPermission_AspNetRoles_UserGroupId",
                        column: x => x.UserGroupId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ValidationRuleFormDefinition",
                columns: table => new
                {
                    ValidationRuleId = table.Column<int>(nullable: false),
                    FormDefinitionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValidationRuleFormDefinition", x => new { x.ValidationRuleId, x.FormDefinitionId });
                    table.ForeignKey(
                        name: "FK_ValidationRuleFormDefinition_FormDefinition_FormDefinitionId",
                        column: x => x.FormDefinitionId,
                        principalTable: "FormDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ValidationRuleFormDefinition_ValidationRule_ValidationRuleId",
                        column: x => x.ValidationRuleId,
                        principalTable: "ValidationRule",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FieldValue",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    FieldDefinitionId = table.Column<int>(nullable: false),
                    EntityInstanceId = table.Column<int>(nullable: false),
                    DateTimeValue = table.Column<DateTime>(nullable: true),
                    DecimalValue = table.Column<decimal>(nullable: true),
                    DoubleValue = table.Column<double>(nullable: true),
                    IntValue = table.Column<int>(nullable: true),
                    BoolValue = table.Column<bool>(nullable: true),
                    OuterIdValue = table.Column<string>(maxLength: 128, nullable: true),
                    StringValue = table.Column<string>(nullable: true),
                    EntityReferenceValue = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FieldValue_EntityInstance_EntityInstanceId",
                        column: x => x.EntityInstanceId,
                        principalTable: "EntityInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FieldValue_EntityInstance_EntityReferenceValue",
                        column: x => x.EntityReferenceValue,
                        principalTable: "EntityInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FieldValue_FieldDefinition_FieldDefinitionId",
                        column: x => x.FieldDefinitionId,
                        principalTable: "FieldDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ValidationRuleFieldDefinition",
                columns: table => new
                {
                    ValidationRuleId = table.Column<int>(nullable: false),
                    FieldDefinitionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValidationRuleFieldDefinition", x => new { x.ValidationRuleId, x.FieldDefinitionId });
                    table.ForeignKey(
                        name: "FK_ValidationRuleFieldDefinition_FieldDefinition_FieldDefinitionId",
                        column: x => x.FieldDefinitionId,
                        principalTable: "FieldDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ValidationRuleFieldDefinition_ValidationRule_ValidationRuleId",
                        column: x => x.ValidationRuleId,
                        principalTable: "ValidationRule",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FormControlBinding",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    FieldDefinitionId = table.Column<int>(nullable: false),
                    IsReadOnly = table.Column<bool>(nullable: false),
                    IsInvalidStateEnabled = table.Column<bool>(nullable: false),
                    UiProperties = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormControlBinding", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormControlBinding_FieldDefinition_FieldDefinitionId",
                        column: x => x.FieldDefinitionId,
                        principalTable: "FieldDefinition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FormControlBinding_FormControl_Id",
                        column: x => x.Id,
                        principalTable: "FormControl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EntityCollectionMember",
                columns: table => new
                {
                    FieldValueId = table.Column<int>(nullable: false),
                    EntityInstanceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityCollectionMember", x => new { x.FieldValueId, x.EntityInstanceId });
                    table.ForeignKey(
                        name: "FK_EntityCollectionMember_EntityInstance_EntityInstanceId",
                        column: x => x.EntityInstanceId,
                        principalTable: "EntityInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityCollectionMember_FieldValue_FieldValueId",
                        column: x => x.FieldValueId,
                        principalTable: "FieldValue",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FieldValueArchive",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true),
                    EntityInstanceArchiveId = table.Column<int>(nullable: false),
                    FieldValueId = table.Column<int>(nullable: false),
                    IntValue = table.Column<int>(nullable: true),
                    DoubleValue = table.Column<double>(nullable: true),
                    DecimalValue = table.Column<decimal>(nullable: true),
                    StringValue = table.Column<string>(nullable: true),
                    DateTimeValue = table.Column<DateTime>(nullable: true),
                    EntityReferenceValue = table.Column<int>(nullable: true),
                    OuterIdValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldValueArchive", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FieldValueArchive_EntityInstanceArchive_EntityInstanceArchiveId",
                        column: x => x.EntityInstanceArchiveId,
                        principalTable: "EntityInstanceArchive",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FieldValueArchive_FieldValue_FieldValueId",
                        column: x => x.FieldValueId,
                        principalTable: "FieldValue",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ValidationRuleFormControlBinding",
                columns: table => new
                {
                    ValidationRuleId = table.Column<int>(nullable: false),
                    FormControlBindingId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValidationRuleFormControlBinding", x => new { x.ValidationRuleId, x.FormControlBindingId });
                    table.ForeignKey(
                        name: "FK_ValidationRuleFormControlBinding_FormControlBinding_FormControlBindingId",
                        column: x => x.FormControlBindingId,
                        principalTable: "FormControlBinding",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ValidationRuleFormControlBinding_ValidationRule_ValidationRuleId",
                        column: x => x.ValidationRuleId,
                        principalTable: "ValidationRule",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLog_AuditLogType",
                table: "AuditLog",
                column: "AuditLogType");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLog_UserId",
                table: "AuditLog",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityCollectionMember_EntityInstanceId",
                table: "EntityCollectionMember",
                column: "EntityInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityDefinition_Name",
                table: "EntityDefinition",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EntityInstance_EntityDefinitionId",
                table: "EntityInstance",
                column: "EntityDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityInstanceArchive_AuditLogId",
                table: "EntityInstanceArchive",
                column: "AuditLogId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityInstanceArchive_EntityInstanceId",
                table: "EntityInstanceArchive",
                column: "EntityInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityInstanceArchive_FormDefinitionId",
                table: "EntityInstanceArchive",
                column: "FormDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldDefinition_EntityDefinitionId",
                table: "FieldDefinition",
                column: "EntityDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldDefinition_FieldType",
                table: "FieldDefinition",
                column: "FieldType");

            migrationBuilder.CreateIndex(
                name: "IX_FieldDefinition_ItemSourceDefinitionId",
                table: "FieldDefinition",
                column: "ItemSourceDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldDefinition_Name",
                table: "FieldDefinition",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FieldValue_EntityInstanceId",
                table: "FieldValue",
                column: "EntityInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldValue_EntityReferenceValue",
                table: "FieldValue",
                column: "EntityReferenceValue");

            migrationBuilder.CreateIndex(
                name: "IX_FieldValue_FieldDefinitionId",
                table: "FieldValue",
                column: "FieldDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldValueArchive_EntityInstanceArchiveId",
                table: "FieldValueArchive",
                column: "EntityInstanceArchiveId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldValueArchive_FieldValueId",
                table: "FieldValueArchive",
                column: "FieldValueId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControl_ContainerFormDefinitionId",
                table: "FormControl",
                column: "ContainerFormDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControl_DisplayType",
                table: "FormControl",
                column: "DisplayType");

            migrationBuilder.CreateIndex(
                name: "IX_FormControl_FormDefinitionId",
                table: "FormControl",
                column: "FormDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControl_ItemSourceDefinitionId",
                table: "FormControl",
                column: "ItemSourceDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControlBinding_FieldDefinitionId",
                table: "FormControlBinding",
                column: "FieldDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormDefinition_EntityDefinitionId",
                table: "FormDefinition",
                column: "EntityDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormDefinition_FormName",
                table: "FormDefinition",
                column: "FormName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FormDefinition_FormType",
                table: "FormDefinition",
                column: "FormType");

            migrationBuilder.CreateIndex(
                name: "IX_FormPermission_UserGroupId",
                table: "FormPermission",
                column: "UserGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemSourceDefinition_ItemSourceEntityDefinitionId",
                table: "ItemSourceDefinition",
                column: "ItemSourceEntityDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_ValidationRuleFieldDefinition_FieldDefinitionId",
                table: "ValidationRuleFieldDefinition",
                column: "FieldDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_ValidationRuleFormControlBinding_FormControlBindingId",
                table: "ValidationRuleFormControlBinding",
                column: "FormControlBindingId");

            migrationBuilder.CreateIndex(
                name: "IX_ValidationRuleFormDefinition_FormDefinitionId",
                table: "ValidationRuleFormDefinition",
                column: "FormDefinitionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "EntityCollectionMember");

            migrationBuilder.DropTable(
                name: "FieldValueArchive");

            migrationBuilder.DropTable(
                name: "FormPermission");

            migrationBuilder.DropTable(
                name: "ValidationRuleFieldDefinition");

            migrationBuilder.DropTable(
                name: "ValidationRuleFormControlBinding");

            migrationBuilder.DropTable(
                name: "ValidationRuleFormDefinition");

            migrationBuilder.DropTable(
                name: "EntityInstanceArchive");

            migrationBuilder.DropTable(
                name: "FieldValue");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "FormControlBinding");

            migrationBuilder.DropTable(
                name: "ValidationRule");

            migrationBuilder.DropTable(
                name: "AuditLog");

            migrationBuilder.DropTable(
                name: "EntityInstance");

            migrationBuilder.DropTable(
                name: "FieldDefinition");

            migrationBuilder.DropTable(
                name: "FormControl");

            migrationBuilder.DropTable(
                name: "AuditLogTypeConstraint",
                schema: "enum");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "FieldTypeConstraint",
                schema: "enum");

            migrationBuilder.DropTable(
                name: "FormDefinition");

            migrationBuilder.DropTable(
                name: "DisplayTypeConstraint",
                schema: "enum");

            migrationBuilder.DropTable(
                name: "ItemSourceDefinition");

            migrationBuilder.DropTable(
                name: "FormTypeConstraint",
                schema: "enum");

            migrationBuilder.DropTable(
                name: "EntityDefinition");
        }
    }
}
