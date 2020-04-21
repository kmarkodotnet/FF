CREATE TABLE [dbo].[EntityCollectionMember](
    [FieldValueId] [int] NOT NULL,
    [EntityInstanceId] [int] NOT NULL,
    CONSTRAINT [PK_EntityCollectionMember] PRIMARY KEY CLUSTERED 
    (
        [FieldValueId] ASC,
        [EntityInstanceId] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[EntityCollectionMember] ADD  CONSTRAINT [FK_EntityCollectionMember_EntityInstance_EntityInstanceId] FOREIGN KEY([EntityInstanceId])
REFERENCES [dbo].[EntityInstance] ([Id])
GO

ALTER TABLE [dbo].[EntityCollectionMember] CHECK CONSTRAINT [FK_EntityCollectionMember_EntityInstance_EntityInstanceId]
GO

ALTER TABLE [dbo].[EntityCollectionMember] ADD  CONSTRAINT [FK_EntityCollectionMember_FieldValue_FieldValueId] FOREIGN KEY([FieldValueId])
REFERENCES [dbo].[FieldValue] ([Id])
GO

ALTER TABLE [dbo].[EntityCollectionMember] CHECK CONSTRAINT [FK_EntityCollectionMember_FieldValue_FieldValueId]
GO