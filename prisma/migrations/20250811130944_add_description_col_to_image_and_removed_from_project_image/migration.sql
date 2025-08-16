/*
  Warnings:

  - You are about to drop the column `description` on the `ProjectImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Image" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "public"."ProjectImage" DROP COLUMN "description";
