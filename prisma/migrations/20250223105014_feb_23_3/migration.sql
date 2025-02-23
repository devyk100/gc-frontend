/*
  Warnings:

  - You are about to drop the column `created_by` on the `LessonPost` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LessonPost" DROP CONSTRAINT "LessonPost_associated_course_fkey";

-- AlterTable
ALTER TABLE "LessonPost" DROP COLUMN "created_by",
ALTER COLUMN "associated_course" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "LessonPost" ADD CONSTRAINT "LessonPost_associated_course_fkey" FOREIGN KEY ("associated_course") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
