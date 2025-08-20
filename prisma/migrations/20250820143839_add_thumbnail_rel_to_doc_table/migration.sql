-- AlterTable
ALTER TABLE "public"."Doc" ADD COLUMN     "thumbnailId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Doc" ADD CONSTRAINT "Doc_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "public"."Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
