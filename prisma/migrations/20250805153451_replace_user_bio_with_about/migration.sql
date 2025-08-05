/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "bio",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "endWork" INTEGER,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "startWork" INTEGER,
ADD COLUMN     "timezone" TEXT;
