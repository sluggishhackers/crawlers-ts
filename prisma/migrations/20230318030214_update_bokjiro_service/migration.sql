/*
  Warnings:

  - The primary key for the `BokjiroService` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ADDR` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `RETURN_STR` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `WLFARE_INFO_ID` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `WLFARE_INFO_NM` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `WLFARE_INFO_OUTL_CN` on the `BokjiroService` table. All the data in the column will be lost.
  - Added the required column `id` to the `BokjiroService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BokjiroService" DROP CONSTRAINT "BokjiroService_pkey",
DROP COLUMN "ADDR",
DROP COLUMN "RETURN_STR",
DROP COLUMN "WLFARE_INFO_ID",
DROP COLUMN "WLFARE_INFO_NM",
DROP COLUMN "WLFARE_INFO_OUTL_CN",
ADD COLUMN     "CmmCd" JSONB,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "selectionContents" TEXT,
ADD COLUMN     "selectionCriteria" TEXT,
ADD COLUMN     "title" TEXT,
ADD CONSTRAINT "BokjiroService_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "BokjiroServiceDetailWays" (
    "id" TEXT NOT NULL,
    "wlfareInfoId" TEXT,
    "wlfareInfoDtlCd" TEXT,
    "wlfareInfoDtlSn" INTEGER,
    "cmsatSn" TEXT,
    "arrgOrd" INTEGER,
    "atcflId" TEXT,
    "atcflSn" INTEGER,
    "oriFileNm" TEXT,
    "dnldNt" TEXT,
    "fileDc" TEXT,
    "wlfareInfoReldNm" TEXT,
    "wlfareInfoReldCn" TEXT,
    "fileFrmNm" TEXT,
    "bokjiroServiceId" TEXT,

    CONSTRAINT "BokjiroServiceDetailWays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BokjiroServiceTargets" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "bokjiroServiceId" TEXT,

    CONSTRAINT "BokjiroServiceTargets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BokjiroServiceDetailWays" ADD CONSTRAINT "BokjiroServiceDetailWays_bokjiroServiceId_fkey" FOREIGN KEY ("bokjiroServiceId") REFERENCES "BokjiroService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BokjiroServiceTargets" ADD CONSTRAINT "BokjiroServiceTargets_bokjiroServiceId_fkey" FOREIGN KEY ("bokjiroServiceId") REFERENCES "BokjiroService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
