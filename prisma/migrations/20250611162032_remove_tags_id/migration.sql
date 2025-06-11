/*
  Warnings:

  - The primary key for the `User_Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User_Tag` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User_Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User_Tag" DROP CONSTRAINT "User_Tag_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ADD CONSTRAINT "User_Tag_pkey" PRIMARY KEY ("userId", "value");
