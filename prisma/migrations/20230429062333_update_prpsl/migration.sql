/*
  Warnings:

  - Added the required column `improvementPlan` to the `Prpsl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `Prpsl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promotionPlan` to the `Prpsl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promotionResult` to the `Prpsl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposal` to the `Prpsl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prpsl" ADD COLUMN     "after" TEXT,
ADD COLUMN     "before" TEXT,
ADD COLUMN     "improvementPlan" TEXT NOT NULL,
ADD COLUMN     "progress" TEXT NOT NULL,
ADD COLUMN     "promotionPlan" TEXT NOT NULL,
ADD COLUMN     "promotionResult" TEXT NOT NULL,
ADD COLUMN     "proposal" TEXT NOT NULL;
