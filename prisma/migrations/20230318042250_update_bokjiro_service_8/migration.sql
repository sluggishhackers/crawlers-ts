/*
  Warnings:

  - You are about to drop the column `aplyMtdDc` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `wlfareSprtBnftCn` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `wlfareSprtTrgtCn` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `wlfareSprtTrgtSlcrCn` on the `BokjiroService` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BokjiroServiceApplyOrder" DROP CONSTRAINT "BokjiroServiceApplyOrder_bokjiroServiceId_fkey";

-- AlterTable
ALTER TABLE "BokjiroService" DROP COLUMN "aplyMtdDc",
DROP COLUMN "wlfareSprtBnftCn",
DROP COLUMN "wlfareSprtTrgtCn",
DROP COLUMN "wlfareSprtTrgtSlcrCn";

-- AlterTable
ALTER TABLE "BokjiroServiceApplyOrder" ALTER COLUMN "bokjiroServiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BokjiroServiceApplyOrder" ADD CONSTRAINT "BokjiroServiceApplyOrder_bokjiroServiceId_fkey" FOREIGN KEY ("bokjiroServiceId") REFERENCES "BokjiroService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
