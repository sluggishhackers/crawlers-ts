/*
  Warnings:

  - You are about to drop the column `wlfareInfoOutlCnstring` on the `BokjiroService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BokjiroService" DROP COLUMN "wlfareInfoOutlCnstring",
ADD COLUMN     "wlfareInfoOutlCn" TEXT;
