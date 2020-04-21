CREATE TABLE [dbo].[FormControlItemSource]
(
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [ItemSourceCondition] [nvarchar](max) NULL,
    [ItemSourceOrder] [nvarchar](max) NULL,
    [IncludeProperties] [nvarchar](max) NULL,
    [PageSize] [int] NOT NULL,

    CONSTRAINT [PK_FormControlItemSource] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
