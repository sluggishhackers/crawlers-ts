import qs from "qs";
import * as https from "https";
import axios from "axios";
import { ServerSideSuspendedItem, SuspendedItem } from "@/models/mfds";
import {
  AssemblyMember,
  ServerSideAssemblyMember,
  ServerSideBillByMembers,
  ServerSideBillEtcOnRegularSessions,
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

export const oldMembers = async ({
  page,
  pageSize,
  age,
  monaCode,
  name,
}: {
  age: number;
  page: number;
  pageSize?: number;
  monaCode?: string;
  name?: string;
}): Promise<ServerSideAssemblyMember[]> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const apiKey = process.env.OPEN_ASSEMBLY_API_KEY || "sample";

  const query: {
    pIndex: number;
    pSize: number;
    KEY: string;
    UNIT_CD: string;
    MONA_CD?: string;
    HG_NM?: string;
    Type: "json";
  } = {
    pIndex: page,
    pSize: pageSize || 10,
    UNIT_CD: `1000${age}`,
    KEY: apiKey,
    Type: "json",
  };

  if (name) {
    query.HG_NM = name;
  }

  if (monaCode) {
    query.MONA_CD = monaCode;
  }

  const queryString = qs.stringify(query, {
    encodeValuesOnly: false,
  });

  const result = await axios.get(
    `https://open.assembly.go.kr/portal/openapi/npffdutiapkzbfyvr?${queryString}`,
    {
      httpsAgent,
    }
  );

  if (result.data?.RESULT?.CODE === "INFO-200") {
    return [];
  }

  return result.data.npffdutiapkzbfyvr[1].row as ServerSideAssemblyMember[];
};

export const members = async ({
  page,
  pageSize,
  monaCode,
  name,
}: {
  page: number;
  pageSize?: number;
  monaCode?: string;
  name?: string;
}): Promise<ServerSideAssemblyMember[]> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const apiKey = process.env.OPEN_ASSEMBLY_API_KEY || "sample";

  const query: {
    pIndex: number;
    pSize: number;
    KEY: string;
    MONA_CD?: string;
    HG_NM?: string;
    Type: "json";
  } = {
    pIndex: page,
    pSize: pageSize || 10,
    KEY: apiKey,
    Type: "json",
  };

  if (name) {
    query.HG_NM = name;
  }

  if (monaCode) {
    query.MONA_CD = monaCode;
  }

  const queryString = qs.stringify(query, {
    encodeValuesOnly: false,
  });

  const result = await axios.get(
    `https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu?${queryString}`,
    {
      httpsAgent,
    }
  );

  if (result.data?.RESULT?.CODE === "INFO-200") {
    return [];
  }

  return result.data.nwvrqwxyaytdsfvhu[1].row as ServerSideAssemblyMember[];
};

export const billsByMembers = async ({
  age,
  page,
  pageSize,
}: {
  age: number;
  page: number;
  pageSize: number;
}) => {
  const apiKey = process.env.OPEN_ASSEMBLY_API_KEY || "sample";

  const query: {
    pIndex: number;
    pSize: number;
    AGE: string;
    KEY: string;
    type: "json";
  } = {
    pIndex: page,
    pSize: pageSize,
    AGE: `${age}`,
    KEY: apiKey,
    type: "json",
  };

  const queryString = qs.stringify(query, {
    encodeValuesOnly: true,
  });

  const result = await axios.get(
    `https://open.assembly.go.kr/portal/openapi/nzmimeepazxkubdpn?${queryString}`
  );

  return result.data.nzmimeepazxkubdpn[1].row as ServerSideBillByMembers[];
};

export const billsEtcOnRegularSessions = async ({
  age,
  page,
  pageSize,
}: {
  age: number;
  page: number;
  pageSize: number;
}) => {
  const apiKey = process.env.OPEN_ASSEMBLY_API_KEY || "sample";
  console.log(apiKey);

  const result = await axios.get(
    `https://open.assembly.go.kr/portal/openapi/nwbpacrgavhjryiph?type=json&pIndex=${page}&pSize=${pageSize}&age=${age}&KEY=${apiKey}`
  );

  return result.data.nwbpacrgavhjryiph[1].row as ServerSideBill[];
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
