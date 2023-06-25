/*
  Warnings:

  - The `prpsl_seq` column on the `Prpsl` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Prpsl" DROP COLUMN "prpsl_seq",
ADD COLUMN     "prpsl_seq" INTEGER;
