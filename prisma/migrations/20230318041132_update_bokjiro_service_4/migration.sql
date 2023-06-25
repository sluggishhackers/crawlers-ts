/*
  Warnings:

  - You are about to drop the column `wlfareInfoId` on the `BokjiroService` table. All the data in the column will be lost.
  - The primary key for the `BokjiroServiceApplyOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BokjiroServiceApplyOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BokjiroServiceTarget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BokjiroServiceTarget` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BokjiroService" DROP COLUMN "wlfareInfoId";

-- AlterTable
ALTER TABLE "BokjiroServiceApplyOrder" DROP CONSTRAINT "BokjiroServiceApplyOrder_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BokjiroServiceApplyOrder_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BokjiroServiceTarget" DROP CONSTRAINT "BokjiroServiceTarget_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BokjiroServiceTarget_pkey" PRIMARY KEY ("id");
