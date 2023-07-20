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
  JOB_RES_NM?: string;
  TEL_NO?: string;
  CMIT_NM?: string;
  CMITS?: string;
  E_MAIL?: string;
  HOMEPAGE?: string;
  STAFF?: string;
  SECRETARY?: string;
  SECRETARY2?: string;
  MEM_TITLE?: string;
  ASSEM_ADDR?: string;
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

export type ServerSideBillByMembers = {
  BILL_ID: string;
  BILL_NO: string;
  BILL_NAME: string;
  COMMITTEE: string;
  PROPOSE_DT: string;
  PROC_RESULT?: string;
  AGE: string;
  DETAIL_LINK: string;
  PROPOSER: string;
  MEMBER_LIST: string[];
  RST_PROPOSER: string;
  PUBL_PROPOSER: string;
  COMMITTEE_ID: string;
};

export type ServerSideBillEtcOnRegularSessions = {
  AGE: string;
  BILL_NO: string;
  BILL_NM: string;
  BILL_KIND: string;
  PROPOSER: string;
  COMMITTEE_NM: string;
  PROC_RESULT_CD: string;
  VOTE_TCNT: string;
  YES_TCNT: string;
  NO_TCNT: string;
  BLANK_TCNT: string;
  PROPOSE_DT: string;
  COMMITTEE_SUBMIT_DT: string;
  COMMITTEE_PRESENT_DT: string;
  COMMITTEE_PROC_DT: string;
  LAW_SUBMIT_DT: string;
  LAW_PRESENT_DT: string;
  LAW_PROC_DT: string;
  RGS_PRESENT_DT: string;
  RGS_PROC_DT: string;
  CURR_TRANS_DT: string;
  ANNOUNCE_DT: string;
  BILL_ID: string;
  LINK_URL: string;
  CURR_COMMITTEE_ID: string;
};

export type AssemblyBill = {
  age: string; // AGE
  no: string; // BILL_NO
  name: string; // BILL_NM
  kind: string; // BILL_KIND
  proposer: string;
  committee: string; // 상임위원회
  voteResult?: string; // 의결결과
  voteCountTotal?: number; // 총투표수, VOTE_TCNT
  voteCountYes?: number;
  voteCountNo?: number;
  voteCountAbstain?: number;
  proposedDate?: string;
  committeeSubmitDate?: string; // 위원회심사_회부일
  committeePresentDate?: string; // 위원회심사_상정일
  committeeVoteDate?: string; // 위원회심사_의결일
  lawSubmitDate?: string; // 법사위체계자구심사_회부일
  lawPresentDate?: string; // 법사위체계자구심사_상정일
  lawVoteDate?: string; // 법사위체계자구심사_의결일
  regularSessionPresentDate?: string; // 본회의심의_상정일
  regularSessionVoteDate?: string; // 본회의심의_의결일
  govTransferedDate?: string; // 정부이송일
  announceDate?: string; // 공포일
  id: string; // 의안ID
  link: string;
  committeeId: string; // 소관위원회ID
};

export type AssemblyMember = {
  monaCode: string;
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
  job?: string;
  tel?: string;
  committee?: string;
  committees?: string;
  email?: string;
  homepage?: string;
  staff?: string[];
  secretary?: string[];
  secretary2?: string[];
  profile?: string[];
  officeAddress?: string;
};
