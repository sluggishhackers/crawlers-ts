/*
  Warnings:

  - Added the required column `category` to the `Prpsl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Prpsl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doneDate` to the `Prpsl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Prpsl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prpsl" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "doneDate" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
