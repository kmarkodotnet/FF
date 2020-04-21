CREATE TABLE [dbo].[FieldDefinition](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [Name] [nvarchar](100) NOT NULL,
    [EntityDefinitionId] [int] NOT NULL,
    [ItemSourceDefinitionId] [int] NULL,
    [FieldType] [int] NOT NULL,
    [Expression] [nvarchar](max) NULL,
    CONSTRAINT [PK_FieldDefinition] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[FieldDefinition] ADD  CONSTRAINT [FK_FieldDefinition_EntityDefinition_EntityDefinitionId] FOREIGN KEY([EntityDefinitionId])
REFERENCES [dbo].[EntityDefinition] ([Id])
GO

ALTER TABLE [dbo].[FieldDefinition] CHECK CONSTRAINT [FK_FieldDefinition_EntityDefinition_EntityDefinitionId]
GO

ALTER TABLE [dbo].[FieldDefinition] ADD  CONSTRAINT [FK_FieldDefinition_FieldTypeConstraint_FieldType] FOREIGN KEY([FieldType])
REFERENCES [enum].[FieldTypeConstraint] ([FieldType])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[FieldDefinition] CHECK CONSTRAINT [FK_FieldDefinition_FieldTypeConstraint_FieldType]
GO

ALTER TABLE [dbo].[FieldDefinition] ADD  CONSTRAINT [FK_FieldDefinition_ItemSourceDefinition_ItemSourceDefinitionId] FOREIGN KEY([ItemSourceDefinitionId])
REFERENCES [dbo].[ItemSourceDefinition] ([Id])
GO

ALTER TABLE [dbo].[FieldDefinition] CHECK CONSTRAINT [FK_FieldDefinition_ItemSourceDefinition_ItemSourceDefinitionId]
GO