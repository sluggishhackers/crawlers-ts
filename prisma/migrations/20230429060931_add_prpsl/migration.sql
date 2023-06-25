-- CreateTable
CREATE TABLE "Prpsl" (
    "id" SERIAL NOT NULL,
    "prpsl_type_cd" TEXT NOT NULL,
    "lafindex" INTEGER NOT NULL,
    "laf_total" INTEGER NOT NULL,
    "confr_grp_nm" TEXT NOT NULL,
    "rgst_dttm" TEXT NOT NULL,
    "prpsl_seq" TEXT NOT NULL,
    "div_cd" TEXT NOT NULL,
    "laf_idx_a" INTEGER NOT NULL,
    "law_status_nm" TEXT NOT NULL,
    "subjt_no" TEXT NOT NULL,
    "subjt_seq" INTEGER NOT NULL,
    "mini_nm" TEXT NOT NULL,
    "prpsl_com_dttm" TEXT NOT NULL,
    "prpsl_ttl" TEXT NOT NULL,
    "laf_t" INTEGER NOT NULL,
    "prpsl_type_seq" TEXT NOT NULL,
    "mini_cd" TEXT NOT NULL,
    "row_id" INTEGER NOT NULL,
    "law_status" TEXT NOT NULL,

    CONSTRAINT "Prpsl_pkey" PRIMARY KEY ("id")
);
