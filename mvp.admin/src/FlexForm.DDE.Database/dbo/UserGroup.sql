﻿-- Not in use while ASP.NET built in User and Role system used

--CREATE TABLE [dbo].[UserGroup](
--	[Id] [uniqueidentifier] NOT NULL,
--	[Name] [nvarchar](256) NOT NULL,
--	[Description] [nvarchar](max) NULL,
--	[Timestamp] [timestamp] NOT NULL,
-- CONSTRAINT [PK_dbo.UserGroup] PRIMARY KEY CLUSTERED 
--(
--	[Id] ASC
--)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
--) ON [PRIMARY] 