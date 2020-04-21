CREATE TABLE [dbo].[UserSettings]
(
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [Name] [nvarchar](256) NOT NULL,
    [UserId] uniqueidentifier NULL,
    [UiProperties] [nvarchar](max) NULL,
    CONSTRAINT [PK_UserSettings] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserSettings] ADD  CONSTRAINT [FK_UserSettings_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[UserSettings] CHECK CONSTRAINT [FK_UserSettings_AspNetUsers_UserId]
GO
