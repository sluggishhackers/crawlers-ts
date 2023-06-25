/*
  Warnings:

  - Made the column `bokjiroServiceId` on table `BokjiroServiceApplyOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BokjiroServiceApplyOrder" DROP CONSTRAINT "BokjiroServiceApplyOrder_bokjiroServiceId_fkey";

-- AlterTable
ALTER TABLE "BokjiroServiceApplyOrder" ALTER COLUMN "bokjiroServiceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BokjiroServiceApplyOrder" ADD CONSTRAINT "BokjiroServiceApplyOrder_bokjiroServiceId_fkey" FOREIGN KEY ("bokjiroServiceId") REFERENCES "BokjiroService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
