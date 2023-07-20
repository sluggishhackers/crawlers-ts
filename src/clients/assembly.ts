import qs from "qs";
import * as https from "https";
import axios from "axios";
import { ServerSideSuspendedItem, SuspendedItem } from "@/models/mfds";
import {
  AssemblyMember,
  ServerSideAssemblyMember,
  ServerSideVotingResultOnRegularSession,
} from "@/models/assembly";

type QUERY_VOTING_RESULTS_ON_REGULAR_SESSION = {
  billId: string;
  voteResult?: "찬성" | "반대" | "기권";
  monaCode?: string;
  age: 20 | 21;
};

// type QUERY_VOTING_RESULTS_ON_REGULAR_SESSION = {
//   HG_NM?: string;
//   POLY_NM?: string;
//   MEMBER_NO?: string;
//   VOTE_DATE?: string;
//   BILL_NO?: string;
//   BILL_NAME?: string;
//   BILL_ID: string;
//   CURR_COMMITTEE?: string;
//   RESULT_VOTE_MOD?: string;
//   CURR_COMMITTEE_ID?: string;
//   MONA_CD?: string;
//   AGE: string;
// };

export const assemblyMembers = async ({
  page,
  pageSize,
  unit,
}: {
  page: number;
  pageSize?: number;
  unit: number;
}): Promise<AssemblyMember[]> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const apiKey = process.env.OPEN_ASSEMBLY_API_KEY || "sample";

  const result = await axios.get(
    `https://open.assembly.go.kr/portal/openapi/npffdutiapkzbfyvr?type=json&key=${apiKey}&UNIT_CD=1000${unit}&pIndex=${page}&pSize=${
      pageSize || 100
    }`,
    {
      httpsAgent,
    }
  );

  const items = result.data.npffdutiapkzbfyvr[1]
    .row as ServerSideAssemblyMember[];

  return items.map((item) => ({
    modaCode: item.MONA_CD,
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

export const votingResultsOnRegularSession = async ({
  monaCode,
  billId,
  voteResult,
  age,
}: QUERY_VOTING_RESULTS_ON_REGULAR_SESSION): Promise<
  ServerSideVotingResultOnRegularSession[]
> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const apiKey = process.env.OPEN_ASSEMBLY_API_KEY || "sample";

  const query: {
    HG_NM?: string;
    POLY_NM?: string;
    BILL_ID: string;
    RESULT_VOTE_MOD?: string;
    MONA_CD?: string;
    AGE: string;
  } = {
    BILL_ID: billId,
    AGE: `${age}`,
  };

  if (monaCode) {
    query.MONA_CD = monaCode;
  }

  if (voteResult) {
    query.RESULT_VOTE_MOD = voteResult;
  }

  const queryString = qs.stringify(query, {
    encodeValuesOnly: true,
  });

  const result = await axios.get(
    `https://open.assembly.go.kr/portal/openapi/nojepdqqaweusdfbi?${queryString}&apiKey=${apiKey}`,
    {
      httpsAgent,
    }
  );

  const items = result.data
    .nojepdqqaweusdfbi[1] as ServerSideVotingResultOnRegularSession[];

  return items;
};
