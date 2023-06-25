/*
  Warnings:

  - You are about to drop the column `selectionContents` on the `BokjiroService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BokjiroService" DROP COLUMN "selectionContents",
ADD COLUMN     "serviceContents" TEXT;
