/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Timeline` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Timeline" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_userId_name_key" ON "public"."Timeline"("userId", "name");
