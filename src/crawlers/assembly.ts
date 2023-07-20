import * as assembly from "@/clients/assembly";
import { AssemblyMember } from "@/models/assembly";

export const fetchMembers = async ({
  page,
  pageSize,
  monaCode,
}: {
  page: number;
  pageSize: number;
  monaCode?: string;
}) => {
  const result = await assembly.members({
    page,
    pageSize,
    monaCode,
  });

  console.log(result[0]);
  return result.map((item) => ({
    monaCode: item.MONA_CD,
    name: item.HG_NM,
    nameHanja: item.HJ_NM,
    nameEnglish: item.ENG_NM,
    birthdateType: item.BTH_GBN_NM,
    birthdate: item.BTH_DATE,
    gender: item.SEX_GBN_NM,
    reelected: item.REELE_GBN_NM,
    unit: item.UNITS,
    partyName: item.POLY_NM,
    electionDistrict: item.ORIG_NM,
    electionDistrictType: item.ELECT_GBN_NM,
    job: item.JOB_RES_NM,
    tel: item.TEL_NO,
    committee: item.CMIT_NM,
    committees: item.CMITS,
    email: item.E_MAIL,
    homepage: item.HOMEPAGE,
    staff: item.STAFF?.split(",").map((item) => item.trim()) || [],
    secretary: item.SECRETARY?.split(",").map((item) => item.trim()) || [],
    secretary2: item.SECRETARY2?.split(",").map((item) => item.trim()) || [],
    profile:
      item.MEM_TITLE?.split("\r\n")?.filter((item) => !!item.trim()) || [],
    officeAddress: item.ASSEM_ADDR,
  })) as AssemblyMember[];
};

export const fetchOldMembers = async ({
  age,
  page,
  pageSize,
  monaCode,
}: {
  age: number;
  page: number;
  pageSize: number;
  monaCode?: string;
}) => {
  const result = await assembly.oldMembers({
    age,
    page,
    pageSize,
    monaCode,
  });

  return result.map((item) => ({
    monaCode: item.MONA_CD,
    name: item.HG_NM,
    nameHanja: item.HJ_NM,
    nameEnglish: item.ENG_NM,
    birthdateType: item.BTH_GBN_NM,
    birthdate: item.BTH_DATE,
    gender: item.SEX_GBN_NM,
    reelected: item.REELE_GBN_NM,
    unit: item.UNITS,
    unitCode: item.UNIT_CD,
    unitName: item.UNIT_NM,
    partyName: item.POLY_NM,
    electionDistrict: item.ORIG_NM,
    electionDistrictType: item.ELECT_GBN_NM,
  })) as AssemblyMember[];
};

export const fetchAssemblyBillsByMembers = async ({
  age,
  page,
  pageSize,
}: {
  age: number;
  page: number;
  pageSize: number;
}) => {
  const result = await assembly.billsByMembers({
    age,
    page,
    pageSize,
  });

  return result.map((bill) => ({
    id: bill.BILL_ID,
    age: +bill.AGE,
    no: bill.BILL_NO,
    name: bill.BILL_NAME,
    proposer: bill.PROPOSER,
    committee: bill.COMMITTEE,
    voteResult: bill.PROC_RESULT,
    proposedDate: bill.PROPOSE_DT,
    committeeId: bill.COMMITTEE_ID,
  }));
};

export const fetchAssemblyBillsEtcOnRegularSessions = async ({
  age,
  page,
  pageSize,
}: {
  age: number;
  page: number;
  pageSize: number;
}) => {
  const result = await assembly.billsEtcOnRegularSessions({
    age,
    page,
    pageSize,
  });

  return result.map((bill) => ({
    age: +bill.AGE,
    no: bill.BILL_NO,
    name: bill.BILL_NM,
    kind: bill.BILL_KIND,
    proposer: bill.PROPOSER,
    committee: bill.COMMITTEE_NM,
    voteResult: bill.PROC_RESULT_CD,
    voteCountTotal: +bill.VOTE_TCNT,
    voteCountYes: +bill.VOTE_TCNT,
    voteCountNo: +bill.NO_TCNT,
    voteCountAbstain: +bill.BLANK_TCNT,
    proposedDate: bill.PROPOSE_DT,
    committeeSubmitDate: bill.COMMITTEE_SUBMIT_DT,
    committeePresentDate: bill.COMMITTEE_PRESENT_DT,
    committeeVoteDate: bill.COMMITTEE_PROC_DT,
    lawSubmitDate: bill.LAW_SUBMIT_DT,
    lawPresentDate: bill.LAW_PRESENT_DT,
    lawVoteDate: bill.LAW_PROC_DT,
    regularSessionPresentDate: bill.RGS_PRESENT_DT,
    regularSessionVoteDate: bill.RGS_PROC_DT,
    govTransferedDate: bill.CURR_TRANS_DT,
    announceDate: bill.ANNOUNCE_DT,
    id: bill.BILL_ID,
    link: bill.LINK_URL,
    committeeId: bill.CURR_COMMITTEE_ID,
  }));
};
