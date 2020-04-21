CREATE TABLE [dbo].[EntityInstance](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [EntityDefinitionId] [int] NOT NULL,
    [IsValid] [bit] NOT NULL,
    CONSTRAINT [PK_EntityInstance] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[EntityInstance] ADD  CONSTRAINT [FK_EntityInstance_EntityDefinition_EntityDefinitionId] FOREIGN KEY([EntityDefinitionId])
REFERENCES [dbo].[EntityDefinition] ([Id])
GO

ALTER TABLE [dbo].[EntityInstance] CHECK CONSTRAINT [FK_EntityInstance_EntityDefinition_EntityDefinitionId]
GO