/*
  Warnings:

  - Changed the type of `prpsl_type_seq` on the `Prpsl` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Prpsl" DROP COLUMN "prpsl_type_seq",
ADD COLUMN     "prpsl_type_seq" INTEGER NOT NULL;
