CREATE TABLE [dbo].[ValidationRuleFormControlBinding](
    [ValidationRuleId] [int] NOT NULL,
    [FormControlBindingId] [int] NOT NULL,
    CONSTRAINT [PK_ValidationRuleFormControlBinding] PRIMARY KEY CLUSTERED 
    (
        [ValidationRuleId] ASC,
        [FormControlBindingId] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ValidationRuleFormControlBinding] ADD  CONSTRAINT [FK_ValidationRuleFormControlBinding_FormControlBinding_FormControlBindingId] FOREIGN KEY([FormControlBindingId])
REFERENCES [dbo].[FormControlBinding] ([Id])
GO

ALTER TABLE [dbo].[ValidationRuleFormControlBinding] CHECK CONSTRAINT [FK_ValidationRuleFormControlBinding_FormControlBinding_FormControlBindingId]
GO

ALTER TABLE [dbo].[ValidationRuleFormControlBinding] ADD  CONSTRAINT [FK_ValidationRuleFormControlBinding_ValidationRule_ValidationRuleId] FOREIGN KEY([ValidationRuleId])
REFERENCES [dbo].[ValidationRule] ([Id])
GO

ALTER TABLE [dbo].[ValidationRuleFormControlBinding] CHECK CONSTRAINT [FK_ValidationRuleFormControlBinding_ValidationRule_ValidationRuleId]
GO