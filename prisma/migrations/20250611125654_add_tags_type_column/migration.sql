-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bio" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User_Tag" ADD COLUMN     "type" TEXT;
