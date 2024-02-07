export type WlfareInfoReldBztpCd = "01" | "02" | "03";

export type Target = {
  text: string;
};

export type WelfareOrder = {
  wlfareInfoId: string;
  wlfareInfoDtlCd: string;
  wlfareInfoDtlSn: number;
  cmsatSn: null;
  arrgOrd: number;
  atcflId: null;
  atcflSn: null;
  oriFileNm: null;
  dnldNt: null;
  fileDc: null;
  wlfareInfoReldNm: string;
  wlfareInfoReldCn: string;
  fileFrmNm: null;
};

export type ServiceInfo = {
  id: string;
  addr?: string;
  cvlwlBizId?: string;
  cvlwlBizRegTeamNm?: string;
  cvlwlBizNm?: string;
  ctpvStdgCd?: string;
  sggStdgCd?: string;
  faclHmpgUrl?: string;
  aplyPageUrl?: string;
  cvlwlRegScd?: string;
  cvlwlProgGdncMtdCd?: string;
  rjctRsnCn?: string;
  aprvDt?: string;
  cvlwlRscCcd?: string;
  etcAtcflId?: string;
  inqTmcnt?: string;
  useYn?: string;

  picTelno?: string;
  picEmadr?: string;
  aplyNeedDocCn?: string;
  bizPrpsCn?: string;
  wlfareInfoId?: string;
  wlfareInfoReldBztpCd: WlfareInfoReldBztpCd;
  frstCrtPgmId: string;
  frstCrtUsrid: string;
  frstCrtPtm: string;
  frstCrtUsrIpadr: string;
  lastChgPgmId: string;
  lastChgUsrid: string;
  lastChgPtm: string;
  lastChgUsrIpadr: string;
  wlfareInfoNm: string;
  wlfareInfoAggrpCdnm: string;
  wlbzslTcdnm: string;
  aplyMtdDcdnm: string;
  mkclPsbltYn: "Y" | "N";
  rprsCtadr: string;
  wlfareInfoOutlCn: string;
  bizChrInstNm: string;
  bizChrDeptNm?: string;
  state?: string;
  simbPsbltYn?: "Y" | "N";
  srvId?: string;
  blchTrgtBizDcd?: string;
  crtrYr?: string;
  onapPsbltYn: "Y" | "N";
  mkclUrl: null;
  onapUrl: null;
  dpsrvChckYn: null;
  wlfareSprtTrgtCn?: string;
  aplyMtdDc?: string;
  wlfareSprtTrgtSlcrCn?: string;
  wlfareSprtBnftCn?: string;
  wlfareInfoDtlCn?: string;
  cvlwlInfoPvsnYmd?: string;
  tagNm: null;
  cmmCdNm: string;
  wlfareInfoReldBztpCdNm: string;
  applyWays: string[];
  cmmCd: CmmCd;
  applyOrders: WelfareOrder[];
  selectionCriterias: string[];
  serviceContents: string[];
  targets: string[];
};

export type ServiceInfoToInsert = {
  id: string;
  addr?: string;
  picTelno?: string;
  picEmadr?: string;
  dateFrom?: string;
  dateTo?: string;
  aplyNeedDocCn?: string;
  etcCn?: string;
  wlfareInfoId?: string;
  wlfareInfoReldBztpCd: WlfareInfoReldBztpCd;
  frstCrtPgmId: string;
  frstCrtUsrid: string;
  frstCrtPtm: string;
  frstCrtUsrIpadr: string;
  lastChgPgmId: string;
  lastChgUsrid: string;
  lastChgPtm: string;
  lastChgUsrIpadr: string;
  wlfareInfoNm: string;
  wlfareInfoAggrpCdnm: string;
  wlbzslTcdnm: string;
  aplyMtdDcdnm: string;
  mkclPsbltYn: "Y" | "N";
  rprsCtadr: string;
  wlfareInfoOutlCn: string;
  bizChrInstNm: string;
  bizChrDeptNm?: string;
  state?: string;
  simbPsbltYn?: "Y" | "N";
  srvId?: string;
  blchTrgtBizDcd?: string;
  crtrYr?: string;
  onapPsbltYn: "Y" | "N";
  mkclUrl: null;
  onapUrl: null;
  dpsrvChckYn: null;
  tagNm: null;
  cmmCdNm: string;
  wlfareInfoReldBztpCdNm: string;
  applyWays?: string;
  link: string;
  cmmCd: CmmCd;
  applyOrders: WelfareOrder[];
  selectionCriterias: string;
  serviceContents: string;
  targets: string;
};

export type CmmCd = {
  CYC_CD?: string;
  WLFARE_INFO_AGGRP_CD?: string;
  SRSP_TRGT_CD?: string;
  WLBZSL_TCD?: string;
  SPRT_CIRC_TCD?: string;
  INC_CRTR_ERSW_CD?: string;
  PNR_SLCR_DTL_CD?: string;
  BKJR_LFTM_CYC_CD?: string;
  OCCP_TYP_CRTR_CD?: string;
  APLY_MTD_DCD?: string;
  WLFBZ_APLCNT_TCD?: string;
  MNOF_LCGV_BIZ_DCD?: string;
  INTRS_THEMA_CD?: string;
  RSDC_CRTR_ERSW_CD?: string;
  INCPR_SLCR_CD?: string;
  DSPSN_REG_DCD?: string;
  TRPR_CHA_CRTR_QLFC_CD?: string;
  TRPR_CHA_HEALTH_SCD?: string;
  FMLY_CRTR_ERSW_CD?: string;
};

type ServerSideServiceFromList = {
  WLFARE_INFO_ID: string;
  WLFARE_INFO_NM: string; // title
  RETURN_STR: string;
  WLFARE_INFO_OUTL_CN: string; // desc
  ADDR: string;
  TAG_NM: string;
  ENFC_BGNG_YMD: string;
  ENFC_END_YMD: string;
  BIZ_CHR_INST_NM: string;
  ONLINEYN: string;
  WLFARE_GDNC_TRGT_KCD: WlfareInfoReldBztpCd;
  RPRS_CTADR: string; // contact
  CVLWL_REG_SCD_NM: string;
  CVL_PROGRSS_STATUS: string;
};

export type Service = {
  wlfareInfoId: string;
  wlfareInfoReldBztpCd: string;
  frstCrtPgmId: string;
  frstCrtUsrid: string;
  frstCrtPtm: string;
  frstCrtUsrIpadr: string;
  lastChgPgmId: string;
  lastChgUsrid: string;
  lastChgPtm: string;
  lastChgUsrIpadr: string;
  wlfareInfoNm: string;
  wlfareInfoAggrpCdnm: string;
  wlbzslTcdnm: string;
  aplyMtdDcdnm: string;
  mkclPsbltYn: "Y" | "N";
  rprsCtadr: string;
  wlfareInfoOutlCn: string;
  bizChrInstNm: string;
  onapPsbltYn: "Y" | "N";
  mkclUrl: string | null;
  onapUrl: string | null;
  dpsrvChckYn: string | null;
  wlfareInfoReldBztpCdNm: string;
  tagNm: string;
};

export type ServerSideServiceList = {
  dmScr: {
    curScrId: string;
    befScrId: string;
  };
  dsServiceList0: ServerSideServiceFromList[];
  dmCount: {
    dsServiceList0Count: number;
  };
};

// export type ReturnStr = {
//   INTRS_THEMA_CD: string;
//   FMLY_CIRC_CD: string;
//   BKJR_LFTM_CYC_CD: string;
//   INCPR_SLCR_CD: string;
//   FMLY_CRTR_ERSW_CD: string;
//   DSPSN_REG_DCD: string;
//   CYC_CD: string;
//   APLY_MTD_DCD: string;
//   WLFBZ_APLCNT_TCD: string;
//   MNOF_LCGV_BIZ_DCD: string;
//   OCCP_TYP_CRTR_CD: string;
//   RSDC_CRTR_ERSW_CD: string;
//   SPRT_CIRC_TCD: string;
//   SRSP_TRGT_CD: string;
//   TRPR_CHA_CRTR_QLFC_CD: string;
//   TRPR_CHA_HEALTH_SCD: string;
//   WLBZSL_TCD: string;
//   WLFARE_INFO_AGGRP_CD: string;
//   INC_CRTR_ERSW_CD: string;
// };
