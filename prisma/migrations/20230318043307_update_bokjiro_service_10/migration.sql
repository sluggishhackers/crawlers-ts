/*
  Warnings:

  - You are about to drop the column `selectionCriteria` on the `BokjiroService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BokjiroService" DROP COLUMN "selectionCriteria",
ADD COLUMN     "selectionCriterias" TEXT;
