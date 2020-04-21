CREATE TABLE [dbo].[ValidationRuleFormDefinition](
    [ValidationRuleId] [int] NOT NULL,
    [FormDefinitionId] [int] NOT NULL,
    CONSTRAINT [PK_ValidationRuleFormDefinition] PRIMARY KEY CLUSTERED 
    (
        [ValidationRuleId] ASC,
        [FormDefinitionId] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ValidationRuleFormDefinition] ADD  CONSTRAINT [FK_ValidationRuleFormDefinition_FormDefinition_FormDefinitionId] FOREIGN KEY([FormDefinitionId])
REFERENCES [dbo].[FormDefinition] ([Id])
GO

ALTER TABLE [dbo].[ValidationRuleFormDefinition] CHECK CONSTRAINT [FK_ValidationRuleFormDefinition_FormDefinition_FormDefinitionId]
GO

ALTER TABLE [dbo].[ValidationRuleFormDefinition] ADD  CONSTRAINT [FK_ValidationRuleFormDefinition_ValidationRule_ValidationRuleId] FOREIGN KEY([ValidationRuleId])
REFERENCES [dbo].[ValidationRule] ([Id])
GO

ALTER TABLE [dbo].[ValidationRuleFormDefinition] CHECK CONSTRAINT [FK_ValidationRuleFormDefinition_ValidationRule_ValidationRuleId]
GO