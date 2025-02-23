/*
  Warnings:

  - Added the required column `img_url` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "img_url" TEXT NOT NULL,
ADD COLUMN     "uid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
