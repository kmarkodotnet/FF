CREATE TABLE [enum].[DisplayTypeConstraint](
    [DisplayType] [int] NOT NULL,
    [Name] [nvarchar](255) NOT NULL,
    CONSTRAINT [PK_DisplayTypeConstraint] PRIMARY KEY CLUSTERED 
    (
        [DisplayType] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO