GO
INSERT [dbo].[UserGroup] ([Id], [Name], [Decsription], [CreatedDate], [ModifiedDate], [CreatedBy], [ModifiedBy]) VALUES (N'e4979f5f-dcc8-e811-b15f-000d3a4e7490', N'PolicyBroker', N'Policy Broker User', CAST(N'2018-10-05T20:22:27.023' AS DateTime), NULL, NULL, NULL)
GO
INSERT [dbo].[UserGroup] ([Id], [Name], [Decsription], [CreatedDate], [ModifiedDate], [CreatedBy], [ModifiedBy]) VALUES (N'e5979f5f-dcc8-e811-b15f-000d3a4e7490', N'ClaimOfficer', N'Claim Officer User', CAST(N'2018-10-05T20:22:27.023' AS DateTime), NULL, NULL, NULL)
GO
INSERT [dbo].[UserGroup] ([Id], [Name], [Decsription], [CreatedDate], [ModifiedDate], [CreatedBy], [ModifiedBy]) VALUES (N'e6979f5f-dcc8-e811-b15f-000d3a4e7490', N'SetupUser', N'System Setup User', CAST(N'2018-10-05T20:22:27.023' AS DateTime), NULL, NULL, NULL)
GO
INSERT [dbo].[UserGroup] ([Id], [Name], [Decsription], [CreatedDate], [ModifiedDate], [CreatedBy], [ModifiedBy]) VALUES (N'e7979f5f-dcc8-e811-b15f-000d3a4e7490', N'Administrator', N'System Administrator', CAST(N'2018-10-05T20:22:27.023' AS DateTime), NULL, NULL, NULL)
GO
INSERT [dbo].[User] ([Id], [UserName], [CreatedDate], [ModifiedDate], [CreatedBy], [ModifiedBy]) VALUES (N'e0979f5f-dcc8-e811-b15f-000d3a4e7490', N'Broker', CAST(N'2018-10-05T20:22:27.023' AS DateTime), NULL, NULL, NULL)
GO
INSERT [dbo].[User] ([Id], [UserName], [CreatedDate], [ModifiedDate], [CreatedBy], [ModifiedBy]) VALUES (N'e1979f5f-dcc8-e811-b15f-000d3a4e7490', N'Admin', CAST(N'2018-10-05T20:22:27.023' AS DateTime), NULL, NULL, NULL)
GO
INSERT [dbo].[User] ([Id], [UserName], [CreatedDate], [ModifiedDate], [CreatedBy], [ModifiedBy]) VALUES (N'e2979f5f-dcc8-e811-b15f-000d3a4e7490', N'Setup', CAST(N'2018-10-05T20:22:27.023' AS DateTime), NULL, NULL, NULL)
GO
INSERT [dbo].[User] ([Id], [UserName], [CreatedDate], [ModifiedDate], [CreatedBy], [ModifiedBy]) VALUES (N'e3979f5f-dcc8-e811-b15f-000d3a4e7490', N'Officer', CAST(N'2018-10-05T20:22:27.023' AS DateTime), NULL, NULL, NULL)
GO
INSERT [dbo].[UserGroupMember] ([UserProfileId], [UserGroupId]) VALUES (N'e0979f5f-dcc8-e811-b15f-000d3a4e7490', N'e4979f5f-dcc8-e811-b15f-000d3a4e7490')
GO
INSERT [dbo].[UserGroupMember] ([UserProfileId], [UserGroupId]) VALUES (N'e2979f5f-dcc8-e811-b15f-000d3a4e7490', N'e5979f5f-dcc8-e811-b15f-000d3a4e7490')
GO
INSERT [dbo].[UserGroupMember] ([UserProfileId], [UserGroupId]) VALUES (N'e3979f5f-dcc8-e811-b15f-000d3a4e7490', N'e5979f5f-dcc8-e811-b15f-000d3a4e7490')
GO
INSERT [dbo].[UserGroupMember] ([UserProfileId], [UserGroupId]) VALUES (N'e1979f5f-dcc8-e811-b15f-000d3a4e7490', N'e6979f5f-dcc8-e811-b15f-000d3a4e7490')
GO
INSERT [dbo].[UserGroupMember] ([UserProfileId], [UserGroupId]) VALUES (N'e2979f5f-dcc8-e811-b15f-000d3a4e7490', N'e6979f5f-dcc8-e811-b15f-000d3a4e7490')
GO
INSERT [dbo].[UserGroupMember] ([UserProfileId], [UserGroupId]) VALUES (N'e1979f5f-dcc8-e811-b15f-000d3a4e7490', N'e7979f5f-dcc8-e811-b15f-000d3a4e7490')
GO
