/*
  Warnings:

  - You are about to drop the column `client` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "client",
ADD COLUMN     "clientId" INTEGER,
ADD COLUMN     "organizationId" INTEGER,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "teamId" INTEGER,
ADD COLUMN     "type" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
