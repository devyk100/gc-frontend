/*
  Warnings:

  - Added the required column `title` to the `LessonPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LessonPost" ADD COLUMN     "title" TEXT NOT NULL;
