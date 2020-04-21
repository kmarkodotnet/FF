CREATE TABLE [enum].[FormTypeConstraint](
    [FormType] [int] NOT NULL,
    [Name] [nvarchar](255) NOT NULL,
    CONSTRAINT [PK_FormTypeConstraint] PRIMARY KEY CLUSTERED 
    (
        [FormType] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO