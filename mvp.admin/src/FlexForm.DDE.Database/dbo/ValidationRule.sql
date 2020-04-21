CREATE TABLE [dbo].[ValidationRule](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [Name] [nvarchar](256) NOT NULL,
    [ValidationMethod] [nvarchar](256) NOT NULL,
    [Parameter] [nvarchar](max) NULL,
    [ValidationErrorMessage] [nvarchar](max) NULL,
    CONSTRAINT [PK_ValidationRule] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO