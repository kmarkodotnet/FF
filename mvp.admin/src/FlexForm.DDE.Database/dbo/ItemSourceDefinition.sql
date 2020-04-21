CREATE TABLE [dbo].[ItemSourceDefinition](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [Name] [nvarchar](255) NULL,
    [ItemSourceEntityDefinitionId] [int] NOT NULL,
    [IsSingleResult] [bit] NOT NULL,
    [ItemSourceCondition] [nvarchar](max) NULL,
    [ItemSourceDefaultOrder] [nvarchar](max) NULL,
    [IncludeProperties] [nvarchar](max) NULL,
    [PageSize] [int] NOT NULL,
     CONSTRAINT [PK_ItemSourceDefinition] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[ItemSourceDefinition] ADD  CONSTRAINT [FK_ItemSourceDefinition_EntityDefinition_ItemSourceEntityDefinitionId] FOREIGN KEY([ItemSourceEntityDefinitionId])
REFERENCES [dbo].[EntityDefinition] ([Id])
GO

ALTER TABLE [dbo].[ItemSourceDefinition] CHECK CONSTRAINT [FK_ItemSourceDefinition_EntityDefinition_ItemSourceEntityDefinitionId]
GO