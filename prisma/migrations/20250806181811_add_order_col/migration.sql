/*
  Warnings:

  - You are about to drop the column `order` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Image" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "public"."UserSkill" ADD COLUMN     "order" INTEGER;
