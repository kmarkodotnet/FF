CREATE TABLE [dbo].[AuditLog](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [UserId] [uniqueidentifier] NOT NULL,
    [AuditLogType] [int] NOT NULL,
    [EventDate] [date] NOT NULL,
    CONSTRAINT [PK_AuditLog] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AuditLog] ADD  DEFAULT (getdate()) FOR [EventDate]
GO

ALTER TABLE [dbo].[AuditLog] ADD  CONSTRAINT [FK_AuditLog_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO

ALTER TABLE [dbo].[AuditLog] CHECK CONSTRAINT [FK_AuditLog_AspNetUsers_UserId]
GO

ALTER TABLE [dbo].[AuditLog] ADD  CONSTRAINT [FK_AuditLog_AuditLogTypeConstraint_AuditLogType] FOREIGN KEY([AuditLogType])
REFERENCES [enum].[AuditLogTypeConstraint] ([AuditLogType])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[AuditLog] CHECK CONSTRAINT [FK_AuditLog_AuditLogTypeConstraint_AuditLogType]
GO
