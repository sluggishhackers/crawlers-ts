/*
  Warnings:

  - You are about to drop the `BokjiroServiceTarget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BokjiroServiceTarget" DROP CONSTRAINT "BokjiroServiceTarget_bokjiroServiceId_fkey";

-- AlterTable
ALTER TABLE "BokjiroService" ADD COLUMN     "Targets" TEXT;

-- DropTable
DROP TABLE "BokjiroServiceTarget";
