CREATE TABLE [dbo].[EntityInstanceArchive](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [EntityInstanceId] [int] NOT NULL,
    [FormDefinitionId] [int] NOT NULL,
    [AuditLogId] [int] NOT NULL,
    CONSTRAINT [PK_EntityInstanceArchive] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[EntityInstanceArchive] ADD  CONSTRAINT [FK_EntityInstanceArchive_AuditLog_AuditLogId] FOREIGN KEY([AuditLogId])
REFERENCES [dbo].[AuditLog] ([Id])
GO

ALTER TABLE [dbo].[EntityInstanceArchive] CHECK CONSTRAINT [FK_EntityInstanceArchive_AuditLog_AuditLogId]
GO

ALTER TABLE [dbo].[EntityInstanceArchive] ADD  CONSTRAINT [FK_EntityInstanceArchive_EntityInstance_EntityInstanceId] FOREIGN KEY([EntityInstanceId])
REFERENCES [dbo].[EntityInstance] ([Id])
GO

ALTER TABLE [dbo].[EntityInstanceArchive] CHECK CONSTRAINT [FK_EntityInstanceArchive_EntityInstance_EntityInstanceId]
GO

ALTER TABLE [dbo].[EntityInstanceArchive] ADD  CONSTRAINT [FK_EntityInstanceArchive_FormDefinition_FormDefinitionId] FOREIGN KEY([FormDefinitionId])
REFERENCES [dbo].[FormDefinition] ([Id])
GO

ALTER TABLE [dbo].[EntityInstanceArchive] CHECK CONSTRAINT [FK_EntityInstanceArchive_FormDefinition_FormDefinitionId]
GO