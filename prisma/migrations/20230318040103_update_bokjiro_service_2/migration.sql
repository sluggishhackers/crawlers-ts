/*
  Warnings:

  - You are about to drop the column `APLY_MTD_DCD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `BIZ_CHR_INST_NM` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `BKJR_LFTM_CYC_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `CVLWL_REG_SCD_NM` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `CVL_PROGRSS_STATUS` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `CYC_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `DSPSN_REG_DCD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `ENFC_BGNG_YMD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `ENFC_END_YMD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `FMLY_CIRC_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `FMLY_CRTR_ERSW_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `INCPR_SLCR_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `INC_CRTR_ERSW_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `INTRS_THEMA_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `MNOF_LCGV_BIZ_DCD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `OCCP_TYP_CRTR_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `ONLINEYN` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `RPRS_CTADR` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `RSDC_CRTR_ERSW_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `SPRT_CIRC_TCD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `SRSP_TRGT_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `TAG_NM` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `TRPR_CHA_CRTR_QLFC_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `TRPR_CHA_HEALTH_SCD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `WLBZSL_TCD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `WLFARE_GDNC_TRGT_KCD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `WLFARE_INFO_AGGRP_CD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `WLFBZ_APLCNT_TCD` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `BokjiroService` table. All the data in the column will be lost.
  - You are about to drop the `BokjiroServiceDetailWays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BokjiroServiceTargets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `wlfareInfoId` to the `BokjiroService` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BokjiroServiceDetailWays" DROP CONSTRAINT "BokjiroServiceDetailWays_bokjiroServiceId_fkey";

-- DropForeignKey
ALTER TABLE "BokjiroServiceTargets" DROP CONSTRAINT "BokjiroServiceTargets_bokjiroServiceId_fkey";

-- AlterTable
ALTER TABLE "BokjiroService" DROP COLUMN "APLY_MTD_DCD",
DROP COLUMN "BIZ_CHR_INST_NM",
DROP COLUMN "BKJR_LFTM_CYC_CD",
DROP COLUMN "CVLWL_REG_SCD_NM",
DROP COLUMN "CVL_PROGRSS_STATUS",
DROP COLUMN "CYC_CD",
DROP COLUMN "DSPSN_REG_DCD",
DROP COLUMN "ENFC_BGNG_YMD",
DROP COLUMN "ENFC_END_YMD",
DROP COLUMN "FMLY_CIRC_CD",
DROP COLUMN "FMLY_CRTR_ERSW_CD",
DROP COLUMN "INCPR_SLCR_CD",
DROP COLUMN "INC_CRTR_ERSW_CD",
DROP COLUMN "INTRS_THEMA_CD",
DROP COLUMN "MNOF_LCGV_BIZ_DCD",
DROP COLUMN "OCCP_TYP_CRTR_CD",
DROP COLUMN "ONLINEYN",
DROP COLUMN "RPRS_CTADR",
DROP COLUMN "RSDC_CRTR_ERSW_CD",
DROP COLUMN "SPRT_CIRC_TCD",
DROP COLUMN "SRSP_TRGT_CD",
DROP COLUMN "TAG_NM",
DROP COLUMN "TRPR_CHA_CRTR_QLFC_CD",
DROP COLUMN "TRPR_CHA_HEALTH_SCD",
DROP COLUMN "WLBZSL_TCD",
DROP COLUMN "WLFARE_GDNC_TRGT_KCD",
DROP COLUMN "WLFARE_INFO_AGGRP_CD",
DROP COLUMN "WLFBZ_APLCNT_TCD",
DROP COLUMN "address",
DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "aplyMtdDc" TEXT,
ADD COLUMN     "aplyMtdDcdnm" TEXT,
ADD COLUMN     "applyWays" JSONB[],
ADD COLUMN     "bizChrInstNm" TEXT,
ADD COLUMN     "cmmCdNm" TEXT,
ADD COLUMN     "dpsrvChckYn" TEXT,
ADD COLUMN     "frstCrtPgmId" TEXT,
ADD COLUMN     "frstCrtPtm" TEXT,
ADD COLUMN     "frstCrtUsrIpadr" TEXT,
ADD COLUMN     "frstCrtUsrid" TEXT,
ADD COLUMN     "lastChgPgmId" TEXT,
ADD COLUMN     "lastChgPtm" TEXT,
ADD COLUMN     "lastChgUsrIpadr" TEXT,
ADD COLUMN     "lastChgUsrid" TEXT,
ADD COLUMN     "mkclPsbltYn" TEXT,
ADD COLUMN     "mkclUrl" TEXT,
ADD COLUMN     "onapPsbltYn" TEXT,
ADD COLUMN     "onapUrl" TEXT,
ADD COLUMN     "rprsCtadr" TEXT,
ADD COLUMN     "tagNm" TEXT,
ADD COLUMN     "wlbzslTcdnm" TEXT,
ADD COLUMN     "wlfareInfoAggrpCdnm" TEXT,
ADD COLUMN     "wlfareInfoId" TEXT NOT NULL,
ADD COLUMN     "wlfareInfoNm" TEXT,
ADD COLUMN     "wlfareInfoOutlCnstring" TEXT,
ADD COLUMN     "wlfareInfoReldBztpCd" TEXT,
ADD COLUMN     "wlfareInfoReldBztpCdNm" TEXT,
ADD COLUMN     "wlfareSprtBnftCn" TEXT,
ADD COLUMN     "wlfareSprtTrgtCn" TEXT,
ADD COLUMN     "wlfareSprtTrgtSlcrCn" TEXT;

-- DropTable
DROP TABLE "BokjiroServiceDetailWays";

-- DropTable
DROP TABLE "BokjiroServiceTargets";

-- CreateTable
CREATE TABLE "BokjiroServiceApplyOrder" (
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

    CONSTRAINT "BokjiroServiceApplyOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BokjiroServiceTarget" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "bokjiroServiceId" TEXT,

    CONSTRAINT "BokjiroServiceTarget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BokjiroServiceApplyOrder" ADD CONSTRAINT "BokjiroServiceApplyOrder_bokjiroServiceId_fkey" FOREIGN KEY ("bokjiroServiceId") REFERENCES "BokjiroService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BokjiroServiceTarget" ADD CONSTRAINT "BokjiroServiceTarget_bokjiroServiceId_fkey" FOREIGN KEY ("bokjiroServiceId") REFERENCES "BokjiroService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
