/*
  Warnings:

  - A unique constraint covering the columns `[blogId,slug]` on the table `Doc` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Doc_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Doc_blogId_slug_key" ON "public"."Doc"("blogId", "slug");
