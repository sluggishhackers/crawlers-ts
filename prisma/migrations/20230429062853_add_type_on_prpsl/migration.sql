/*
  Warnings:

  - Added the required column `type` to the `Prpsl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prpsl" ADD COLUMN     "type" TEXT NOT NULL;
