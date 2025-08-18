import { Prisma } from "@prisma/client"

export type BlogWithDocsBasicAndAuthor = Prisma.BlogGetPayload<{
  select: {
    id: true
    slug: true
    title: true
    description: true
    createdAt: true
    updatedAt: true
    userId: true
    organizationId: true
    teamId: true
    thumbnailId: true
    pinnedDocId: true
    author: {
      select: {
        id: true
        name: true
        slug: true
      }
    }
    docs: {
      select: {
        id: true
        slug: true
        title: true
        description: true
        blogId: true
        createdAt: true
        updatedAt: true
        isPublished: true
        order: true
      }
    }
  }
}>

export type DocsBasic = Prisma.DocGetPayload<{
  select: {
    id: true
    slug: true
    title: true
    description: true
    blogId: true
    createdAt: true
    updatedAt: true
    isPublished: true
    order: true
  }
}>
