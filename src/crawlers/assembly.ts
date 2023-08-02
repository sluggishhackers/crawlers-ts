import * as assembly from "@/clients/assembly";
import {
  AssemblyBill,
  AssemblyCommittee,
  AssemblyMember,
  AssemblyMemberFromHJ,
  AssemblyVoteByBill,
  BonMeeting,
} from "@/models/assembly";

export const fetchBonMeetings = async ({
  age,
  page,
}: {
  page: number;
  age: number;
}) => {
  const result = await assembly.bonMeetings({
    page,
    pageSize: 400,
    age,
  });

  return result.map((item) => {
    const regex = /uniqId=(\d+)/;
    const id = regex.exec(item.LINK_URL);

    const regexForTerm = /제(\d+)회/;
    const term = regexForTerm.exec(item.MEETINGSESSION);
    return {
      id: id ? id[1] : "",
      termStr: item.MEETINGSESSION.trim(),
      term: term ? +term[1] : null,
      number: +item.CHA.trim().slice(1, -1).trim(),
      title: item.TITLE.trim(),
      date: item.MEETTING_DATE.trim(),
      time: item.MEETTING_TIME?.trim() || "",
      url: item.LINK_URL.trim(),
      age: +item.UNIT_CD.slice(4),
    };
  }) as BonMeeting[];
};

export const fetchCommittees = async ({ page }: { page: number }) => {
  const result = await assembly.committees({
    page,
    pageSize: 200,
  });

  return result.map((item) => ({
    id: item.HR_DEPT_CD,
    name: item.COMMITTEE_NAME,
    chairperson: item.HG_NM,
    assistants: item.HG_NM_LIST,
    limitAssistantsCount: item.LIMIT_CNT,
    currentCount: item.CURR_CNT,
    nonNegotiationBodyCount: +(item.POLY99_CNT || 0),
    negotiationBodyCount: +(item.POLY_CNT || 0),
  })) as AssemblyCommittee[];
};

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

  return result.map((item) => {
    return {
      monaCode: item.MONA_CD,
      name: item.HG_NM,
      nameHanja: item.HJ_NM,
      nameEnglish: item.ENG_NM,
      birthdateType: item.BTH_GBN_NM,
      birthdate: item.BTH_DATE,
      gender: item.SEX_GBN_NM,
      reelected: item.REELE_GBN_NM,
      partyName: item.POLY_NM,
      electionDistrict: item.ORIG_NM,
      electionDistrictType: item.ELECT_GBN_NM,
      job: item.JOB_RES_NM,
      tel: item.TEL_NO,
      committee: item.CMIT_NM,
      committees: item.CMITS?.split(",").map((item) => item.trim()) || [],
      email: item.E_MAIL,
      homepage: item.HOMEPAGE,
      staff: item.STAFF?.split(",").map((item) => item.trim()) || [],
      secretary: item.SECRETARY?.split(",").map((item) => item.trim()) || [],
      secretary2: item.SECRETARY2?.split(",").map((item) => item.trim()) || [],
      profile:
        item.MEM_TITLE?.split("\r\n")?.filter((item) => !!item.trim()) || [],
      officeAddress: item.ASSEM_ADDR,
    };
  }) as AssemblyMember[];
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

  return result.map((item) => {
    return {
      monaCode: item.MONA_CD,
      name: item.HG_NM,
      nameHanja: item.HJ_NM,
      nameEnglish: item.ENG_NM,
      birthdateType: item.BTH_GBN_NM,
      birthdate: item.BTH_DATE,
      gender: item.SEX_GBN_NM,
      reelected: item.REELE_GBN_NM,
      partyName: item.POLY_NM,
      electionDistrict: item.ORIG_NM,
      electionDistrictType: item.ELECT_GBN_NM,
    };
  }) as AssemblyMember[];
};

export const fetchOldMembersFromHJ = async ({
  age,
  page,
  pageSize,
}: {
  age: number;
  page: number;
  pageSize: number;
}) => {
  const result = await assembly.oldMembersFromHJ({
    age,
    page,
    pageSize,
  });

  return result.map((item) => {
    const idxRegex = /idx=(\d+)/;
    const idxResult = idxRegex.exec(item.URL);

    return {
      id: idxResult ? idxResult[1] : "",
      age: +item.DAESU,
      partiesByAge: item.DAE?.split("\r\n").map((item) => item.trim()) || [],
      name: item.NAME,
      nameHanja: item.NAME_HAN,
      birthDate:
        item.BIRTH?.trim()
          .slice(0, -1)
          .replaceAll(/년 |월 /g, "-") || "",
      birthRegion: item.BON,
      careerAndEducation:
        item.HAK?.replaceAll("·  ", "")
          .split("\r\n")
          .map((item) => item.trim())
          .filter((item) => !!item) || [],
      religionAndHobby: item.HOBBY?.split(",").map((item) => item.trim()) || [],
      books: item.BOOK?.split(",").map((item) => item.trim()) || [],
      deadDate: item.DEAD?.replaceAll(/년 |월 |일/g, "-") || "",
      url: item.URL,
    } as AssemblyMemberFromHJ;
  });
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

export const fetchVotingResultOnRegularSessionsByMembers = async ({
  age,
  monaCode,
  billId,
}: {
  age: number;
  billId: string;
  monaCode?: string;
}) => {
  const result = await assembly.votingResultsOnRegularSession({
    monaCode,
    billId,
    age,
  });

  /**
   *     HG_NM: '김경진',
    HJ_NM: '金京鎭',
    POLY_NM: '무소속',
    ORIG_NM: '광주 북구갑',
    MEMBER_NO: '2000000000097',
    POLY_CD: '101030',
    ORIG_CD: '050007',
    VOTE_DATE: '20171109 144830',
    BILL_NO: '2010062',
    BILL_NAME: '관광기본법 일부개정법률안(대안)',
    BILL_ID: 'PRC_F1T7R0M9O2V7V1G7C3Q4O0T2D6O6P5',
    LAW_TITLE: '관광기본법',
    CURR_COMMITTEE: '교육문화체육관광위원회',
    RESULT_VOTE_MOD: '찬성',
    DEPT_CD: '9770970',
    CURR_COMMITTEE_ID: '9700406',
    DISP_ORDER: 0,
    BILL_URL: 'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_F1T7R0M9O2V7V1G7C3Q4O0T2D6O6P5',
    BILL_NAME_URL: 'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_F1T7R0M9O2V7V1G7C3Q4O0T2D6O6P5',
    SESSION_CD: 354,
    CURRENTS_CD: 12,
    AGE: 20,
    MONA_CD: 'YVN3115U'
   */
  return result.map((bill) => {
    const voteDates = bill.VOTE_DATE.trim().split(" ")[0];
    return {
      billId: bill.BILL_ID,
      voteDate: `${voteDates.slice(0, 4)}-${voteDates.slice(
        4,
        6
      )}-${voteDates.slice(6)}`,
      committeeId: bill.CURR_COMMITTEE_ID,
      voteResultCode: bill.RESULT_VOTE_MOD,
      age: +bill.AGE,
      sessionTerm: +bill.SESSION_CD,
      sessionNumber: +bill.CURRENTS_CD,
      monaCode: bill.MONA_CD,
    };
  }) as AssemblyVoteByBill[];
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

export const fetchAssemblyBills = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const result = await assembly.bills({
    page,
    pageSize,
  });

  return result
    .map((bill) => {
      if (!bill.CURR_COMMITTEE_ID) {
        return null;
      }

      return {
        id: bill.BILL_ID,
        age: +bill.AGE,
        no: bill.BILL_NO,
        name: bill.BILL_NAME,
        proposedDate: bill.PROPOSE_DT,
        proposer: bill.PROPOSER,
        committee: bill.CURR_COMMITTEE,
        voteResult: bill.PROC_RESULT_CD,
        voteDate: bill.PROC_DT,
        link: bill.LINK_URL,
        committeeId: bill.CURR_COMMITTEE_ID,
      };
    })
    .filter((item) => !!item) as AssemblyBill[];
};
