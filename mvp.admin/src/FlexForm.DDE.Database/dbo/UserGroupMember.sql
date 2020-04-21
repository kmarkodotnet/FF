-- Not in use while ASP.NET built in User and Role system used

--CREATE TABLE [dbo].[UserGroupMember](
--	[UserId] [uniqueidentifier] NOT NULL,
--	[UserGroupId] [uniqueidentifier] NOT NULL,
-- CONSTRAINT [PK_dbo.UserGroupMember] PRIMARY KEY CLUSTERED 
--(
--	[UserId] ASC,
--	[UserGroupId] ASC
--)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
--) ON [PRIMARY]
--GO

--ALTER TABLE [dbo].[UserGroupMember]  ADD  CONSTRAINT [FK_dbo.UserGroupMember_dbo.User_UserId] FOREIGN KEY([UserId])
--REFERENCES [dbo].[User] ([Id])
--GO

--ALTER TABLE [dbo].[UserGroupMember] CHECK CONSTRAINT [FK_dbo.UserGroupMember_dbo.User_UserId]
--GO

--ALTER TABLE [dbo].[UserGroupMember]  ADD  CONSTRAINT [FK_dbo.UserGroupMember_dbo.UserGroup_UserGroupId] FOREIGN KEY([UserGroupId])
--REFERENCES [dbo].[UserGroup] ([Id])
--GO

--ALTER TABLE [dbo].[UserGroupMember] CHECK CONSTRAINT [FK_dbo.UserGroupMember_dbo.UserGroup_UserGroupId]
--GO