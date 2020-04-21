CREATE TABLE [dbo].[FormControl](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [FormDefinitionId] [int] NOT NULL,
    [Name] [nvarchar](256) NULL,
    [DisplayType] [int] NOT NULL,
    [FormControlItemSourceId] [int] NULL,
    [SubFormDefinitionId] [int] NULL,
    [UiProperties] [nvarchar](max) NULL,
    CONSTRAINT [PK_FormControl] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[FormControl] ADD  CONSTRAINT [FK_FormControl_DisplayTypeConstraint_DisplayType] FOREIGN KEY([DisplayType])
REFERENCES [enum].[DisplayTypeConstraint] ([DisplayType])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[FormControl] CHECK CONSTRAINT [FK_FormControl_DisplayTypeConstraint_DisplayType]
GO


ALTER TABLE [dbo].[FormControl] ADD  CONSTRAINT [FK_FormControl_FormDefinition_SubFormDefinitionId] FOREIGN KEY([SubFormDefinitionId])
REFERENCES [dbo].[FormDefinition] ([Id])
GO

ALTER TABLE [dbo].[FormControl] CHECK CONSTRAINT [FK_FormControl_FormDefinition_SubFormDefinitionId]
GO


ALTER TABLE [dbo].[FormControl] ADD  CONSTRAINT [FK_FormControl_FormDefinition_FormDefinitionId] FOREIGN KEY([FormDefinitionId])
REFERENCES [dbo].[FormDefinition] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[FormControl] CHECK CONSTRAINT [FK_FormControl_FormDefinition_FormDefinitionId]
GO

ALTER TABLE [dbo].[FormControl] ADD  CONSTRAINT [FK_FormControl_FormControlItemSource_FormControlItemSourceId] FOREIGN KEY([FormControlItemSourceId])
REFERENCES [dbo].[FormControlItemSource] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[FormControl] CHECK CONSTRAINT [FK_FormControl_FormControlItemSource_FormControlItemSourceId]
GO