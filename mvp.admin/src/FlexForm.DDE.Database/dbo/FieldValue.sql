CREATE TABLE [dbo].[FieldValue](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [FieldDefinitionId] [int] NOT NULL,
    [EntityInstanceId] [int] NOT NULL,
    [DateTimeValue] [datetime2](7) NULL,
    [DecimalValue] [decimal](18, 2) NULL,
    [DoubleValue] [float] NULL,
    [IntValue] [int] NULL,
    [BoolValue] [bit] NULL,
    [OuterIdValue] [nvarchar](128) NULL,
    [StringValue] [nvarchar](max) NULL,
    [EntityReferenceValue] [int] NULL,
     CONSTRAINT [PK_FieldValue] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[FieldValue] ADD  CONSTRAINT [FK_FieldValue_EntityInstance_EntityInstanceId] FOREIGN KEY([EntityInstanceId])
REFERENCES [dbo].[EntityInstance] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[FieldValue] CHECK CONSTRAINT [FK_FieldValue_EntityInstance_EntityInstanceId]
GO

ALTER TABLE [dbo].[FieldValue] ADD  CONSTRAINT [FK_FieldValue_EntityInstance_EntityReferenceValue] FOREIGN KEY([EntityReferenceValue])
REFERENCES [dbo].[EntityInstance] ([Id])
GO

ALTER TABLE [dbo].[FieldValue] CHECK CONSTRAINT [FK_FieldValue_EntityInstance_EntityReferenceValue]
GO

ALTER TABLE [dbo].[FieldValue] ADD  CONSTRAINT [FK_FieldValue_FieldDefinition_FieldDefinitionId] FOREIGN KEY([FieldDefinitionId])
REFERENCES [dbo].[FieldDefinition] ([Id])
GO

ALTER TABLE [dbo].[FieldValue] CHECK CONSTRAINT [FK_FieldValue_FieldDefinition_FieldDefinitionId]
GO
