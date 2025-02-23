-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'User of GengoConnect',
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true;
