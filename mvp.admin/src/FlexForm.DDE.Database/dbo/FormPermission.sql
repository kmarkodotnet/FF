CREATE TABLE [dbo].[FormPermission](
    [FormDefinitionId] [int] NOT NULL,
    [UserGroupId] [uniqueidentifier] NOT NULL,
    CONSTRAINT [PK_FormPermission] PRIMARY KEY CLUSTERED 
    (
        [FormDefinitionId] ASC,
        [UserGroupId] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FormPermission] ADD  CONSTRAINT [FK_FormPermission_AspNetRoles_UserGroupId] FOREIGN KEY([UserGroupId])
REFERENCES [dbo].[AspNetRoles] ([Id])
GO

ALTER TABLE [dbo].[FormPermission] CHECK CONSTRAINT [FK_FormPermission_AspNetRoles_UserGroupId]
GO

ALTER TABLE [dbo].[FormPermission] ADD  CONSTRAINT [FK_FormPermission_FormDefinition_FormDefinitionId] FOREIGN KEY([FormDefinitionId])
REFERENCES [dbo].[FormDefinition] ([Id])
GO

ALTER TABLE [dbo].[FormPermission] CHECK CONSTRAINT [FK_FormPermission_FormDefinition_FormDefinitionId]
GO