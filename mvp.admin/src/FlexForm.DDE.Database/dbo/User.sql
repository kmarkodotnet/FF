﻿-- Not in use while ASP.NET built in User and Role system used

--CREATE TABLE [dbo].[User](
--	[Id] [uniqueidentifier] NOT NULL,
--	[UserName] [nvarchar](256) NOT NULL,
--  [LastName] [nvarchar](256) NULL,
--  [FirstName] [nvarchar](256) NULL,
--	[Timestamp] [timestamp] NOT NULL,
-- CONSTRAINT [PK_dbo.User] PRIMARY KEY CLUSTERED 
--(
--	[Id] ASC
--)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
--) ON [PRIMARY] 