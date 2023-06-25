/*
  Warnings:

  - You are about to drop the column `Targets` on the `BokjiroService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BokjiroService" DROP COLUMN "Targets",
ADD COLUMN     "targets" TEXT;
