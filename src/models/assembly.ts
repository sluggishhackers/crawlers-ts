export type ServerSideAssemblyMember = {
  MONA_CD: string;
  HG_NM: string;
  HJ_NM: string;
  ENG_NM: string;
  BTH_GBN_NM: string;
  BTH_DATE: string;
  SEX_GBN_NM: string;
  REELE_GBN_NM: string;
  UNITS: string;
  UNIT_CD: string;
  UNIT_NM: string;
  POLY_NM: string;
  ORIG_NM: string;
  ELECT_GBN_NM: string;
};

export type ServerSideVotingResultOnRegularSession = {
  HG_NM: string;
  HJ_NM: string;
  POLY_NM: string;
  ORIG_NM: string;
  MEMBER_NO: string;
  POLY_CD: string;
  ORIG_CD: string;
  VOTE_DATE: string;
  BILL_NO: string;
  BILL_NAME: string;
  BILL_ID: string;
  LAW_TITLE: string;
  CURR_COMMITTEE: string;
  RESULT_VOTE_MOD: string;
  DEPT_CD: string;
  CURR_COMMITTEE_ID: string;
  DISP_ORDER: string;
  BILL_URL: string;
  BILL_NAME_URL: string;
  SESSION_CD: string;
  CURRENTS_CD: string;
  AGE: string;
  MONA_CD: string;
};

export type AssemblyMember = {
  modaCode: string;
  name: string;
  nameHanja: string;
  nameEnglish: string;
  birthdateType: string;
  birthdate: string;
  gender: string;
  reelected: string;
  unit: string;
  unitCode: string;
  unitName: string;
  partyName: string;
  electionDistrict: string;
  electionDistrictType: string;
};
