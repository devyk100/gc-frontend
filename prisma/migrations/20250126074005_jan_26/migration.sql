/*
  Warnings:

  - Added the required column `email` to the `LiveClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `LiveClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mod_password` to the `LiveClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `LiveClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LiveClass" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "length" INTEGER NOT NULL,
ADD COLUMN     "mod_password" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
