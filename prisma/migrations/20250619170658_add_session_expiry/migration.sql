/*
  Warnings:

  - Added the required column `secretHash` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Made the column `userAgent` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "secretHash" BYTEA NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "expiresAt" DROP DEFAULT,
ALTER COLUMN "userAgent" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
