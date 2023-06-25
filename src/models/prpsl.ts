export type Prpsl = {
  prpsl_type_cd: string;
  lafindex: number;
  laf_total: number;
  confr_grp_nm: string;
  rgst_dttm: string;
  prpsl_seq: number | null;
  div_cd: string;
  laf_idx_a: number;
  law_status_nm: string;
  subjt_no: string;
  subjt_seq: number | null;
  mini_nm: string;
  prpsl_com_dttm: string;
  prpsl_ttl: string;
  laf_t: number;
  prpsl_type_seq: number | null;
  mini_cd: string;
  row_id: number;
  law_status: string;
  link: string;
};

export type PrpslDetail = {
  title: string;
  category: string;
  department?: string;
  doneDate?: string;
  before?: string;
  after?: string;
  proposal: string;
  improvementPlan: string;
  promotionPlan: string;
  promotionResult: string;
  progress: string;
  type: string;
};
