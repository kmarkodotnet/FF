CREATE TABLE [dbo].[FormControlBinding](
    [Id] [int] NOT NULL,
    [Timestamp] [timestamp] NULL,
    [FieldDefinitionId] [int] NOT NULL,
    [IsReadOnly] [bit] NOT NULL,
    [IsInvalidStateEnabled] [bit] NOT NULL,
    [UiProperties] [nvarchar](max) NULL,
    CONSTRAINT [PK_FormControlBinding] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[FormControlBinding] ADD  CONSTRAINT [FK_FormControlBinding_FieldDefinition_FieldDefinitionId] FOREIGN KEY([FieldDefinitionId])
REFERENCES [dbo].[FieldDefinition] ([Id])
GO

ALTER TABLE [dbo].[FormControlBinding] CHECK CONSTRAINT [FK_FormControlBinding_FieldDefinition_FieldDefinitionId]
GO

ALTER TABLE [dbo].[FormControlBinding] ADD  CONSTRAINT [FK_FormControlBinding_FormControl_Id] FOREIGN KEY([Id])
REFERENCES [dbo].[FormControl] ([Id])
GO

ALTER TABLE [dbo].[FormControlBinding] CHECK CONSTRAINT [FK_FormControlBinding_FormControl_Id]
GO