import { Prisma } from "@prisma/client"

export type BlogWithDocsBasicAndAuthorAndThumbnail = Prisma.BlogGetPayload<{
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
    thumbnailId: false,
    thumbnail: {
      select: {
        url: true,
      }
    }
    pinnedDocId: true
    author: {
      select: {
        id: true,
        name: true,
        slug: true,
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

export type DocWithThumbnail = Prisma.DocGetPayload<{
  select: {
    id: true,
    slug: true,
    title: true,
    description: true,
    createdAt: true,
    updatedAt: true,
    isPublished: true,
    body: true,
    thumbnail: {
      select: {
        url: true,
        description: true,
      }
    }
  }
}>

export type DocWithThumbnailAndAuthor = Prisma.DocGetPayload<{
  select: {
    id: true,
    slug: true,
    title: true,
    description: true,
    createdAt: true,
    updatedAt: true,
    isPublished: true,
    body: true,
    blog: {
      select: {
        author: {
          select: {
            name: true,
            slug: true,
          }
        },
      }
    }
    thumbnail: {
      select: {
        url: true,
        description: true,
      }
    }
  }
}>

export type DocWithThumbnailAndBlogBasics = Prisma.DocGetPayload<{
  select: {
    id: true,
    slug: true,
    title: true,
    description: true,
    createdAt: true,
    updatedAt: true,
    isPublished: true,
    body: true,
    blog: {
      select: {
        slug: true,
        title: true,
        thumbnail: {
          select: {
            url: true
          }
        }
        author: {
          select: {
            name: true,
            slug: true,
          }
        },
      }
    }
    thumbnail: {
      select: {
        url: true,
        description: true,
      }
    }
  }
}>
