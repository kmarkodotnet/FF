CREATE TABLE [dbo].[FieldValueArchive](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Timestamp] [timestamp] NULL,
    [EntityInstanceArchiveId] [int] NOT NULL,
    [FieldValueId] [int] NOT NULL,
    [IntValue] [int] NULL,
    [DoubleValue] [float] NULL,
    [DecimalValue] [decimal](18, 2) NULL,
    [StringValue] [nvarchar](max) NULL,
    [DateTimeValue] [datetime2](7) NULL,
    [EntityReferenceValue] [int] NULL,
    [OuterIdValue] [nvarchar](max) NULL,
    CONSTRAINT [PK_FieldValueArchive] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[FieldValueArchive] ADD  CONSTRAINT [FK_FieldValueArchive_EntityInstanceArchive_EntityInstanceArchiveId] FOREIGN KEY([EntityInstanceArchiveId])
REFERENCES [dbo].[EntityInstanceArchive] ([Id])
GO

ALTER TABLE [dbo].[FieldValueArchive] CHECK CONSTRAINT [FK_FieldValueArchive_EntityInstanceArchive_EntityInstanceArchiveId]
GO

ALTER TABLE [dbo].[FieldValueArchive] ADD  CONSTRAINT [FK_FieldValueArchive_FieldValue_FieldValueId] FOREIGN KEY([FieldValueId])
REFERENCES [dbo].[FieldValue] ([Id])
GO

ALTER TABLE [dbo].[FieldValueArchive] CHECK CONSTRAINT [FK_FieldValueArchive_FieldValue_FieldValueId]
GO