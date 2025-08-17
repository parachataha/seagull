-- CreateTable
CREATE TABLE "public"."Blog" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER,
    "teamId" INTEGER,
    "organizationId" INTEGER,
    "thumbnailId" INTEGER,
    "pinnedDocId" INTEGER,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Doc" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "body" JSONB NOT NULL,
    "blogId" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER,

    CONSTRAINT "Doc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "public"."Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_pinnedDocId_key" ON "public"."Blog"("pinnedDocId");

-- CreateIndex
CREATE UNIQUE INDEX "Doc_slug_key" ON "public"."Doc"("slug");

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "public"."Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_pinnedDocId_fkey" FOREIGN KEY ("pinnedDocId") REFERENCES "public"."Doc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Doc" ADD CONSTRAINT "Doc_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
