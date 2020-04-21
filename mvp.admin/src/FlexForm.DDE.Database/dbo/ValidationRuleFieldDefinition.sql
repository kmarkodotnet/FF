CREATE TABLE [dbo].[ValidationRuleFieldDefinition](
    [ValidationRuleId] [int] NOT NULL,
    [FieldDefinitionId] [int] NOT NULL,
    CONSTRAINT [PK_ValidationRuleFieldDefinition] PRIMARY KEY CLUSTERED 
    (
        [ValidationRuleId] ASC,
        [FieldDefinitionId] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ValidationRuleFieldDefinition] ADD  CONSTRAINT [FK_ValidationRuleFieldDefinition_FieldDefinition_FieldDefinitionId] FOREIGN KEY([FieldDefinitionId])
REFERENCES [dbo].[FieldDefinition] ([Id])
GO

ALTER TABLE [dbo].[ValidationRuleFieldDefinition] CHECK CONSTRAINT [FK_ValidationRuleFieldDefinition_FieldDefinition_FieldDefinitionId]
GO

ALTER TABLE [dbo].[ValidationRuleFieldDefinition] ADD  CONSTRAINT [FK_ValidationRuleFieldDefinition_ValidationRule_ValidationRuleId] FOREIGN KEY([ValidationRuleId])
REFERENCES [dbo].[ValidationRule] ([Id])
GO

ALTER TABLE [dbo].[ValidationRuleFieldDefinition] CHECK CONSTRAINT [FK_ValidationRuleFieldDefinition_ValidationRule_ValidationRuleId]
GO