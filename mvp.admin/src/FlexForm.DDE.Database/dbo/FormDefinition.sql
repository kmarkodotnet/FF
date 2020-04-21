CREATE TABLE [dbo].[FormDefinition](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [EntityDefinitionId] [int] NULL,
    [FormName] [nvarchar](255) NOT NULL,
    [Title] [nvarchar](255) NULL,
    [Description] [nvarchar](max) NULL,
    [FormType] [int] NOT NULL,
    [IsRootForm] [bit] NOT NULL,
    [IsInvalidStateEnabled] [bit] NOT NULL,
    [UiProperties] [nvarchar](max) NULL,
    CONSTRAINT [PK_FormDefinition] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[FormDefinition] ADD  CONSTRAINT [FK_FormDefinition_EntityDefinition_EntityDefinitionId] FOREIGN KEY([EntityDefinitionId])
REFERENCES [dbo].[EntityDefinition] ([Id])
GO

ALTER TABLE [dbo].[FormDefinition] CHECK CONSTRAINT [FK_FormDefinition_EntityDefinition_EntityDefinitionId]
GO

ALTER TABLE [dbo].[FormDefinition] ADD  CONSTRAINT [FK_FormDefinition_FormTypeConstraint_FormType] FOREIGN KEY([FormType])
REFERENCES [enum].[FormTypeConstraint] ([FormType])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[FormDefinition] CHECK CONSTRAINT [FK_FormDefinition_FormTypeConstraint_FormType]
GO