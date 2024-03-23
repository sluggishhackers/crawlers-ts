import axios from "axios";
import {
  ServerSideGeneralElectionElectoralDistrict,
  ServerSideGeneralElectionSido,
} from "@/models/election";

const ELECTION_ID = "0020240410";

export type GeneralElectionCode = {
  국회의원: "2";
  구시군장선거: "4";
  시도의회의원선거: "5";
  구시군의회의원선거: "6";
  비례대표: "7";
};

export const generalElectionPropotionalParties = async ({
  electionCode,
}: {
  electionCode: GeneralElectionCode;
}): Promise<ServerSideGeneralElectionSido[]> => {
  const result = await axios.post(
    `http://info.nec.go.kr/bizcommon/selectbox/selectbox_cityCodeBySgJson.json`,
    {
      electionId: ELECTION_ID,
      electionCode,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return result.data.jsonResult.body as ServerSideGeneralElectionSido[];
};

export const generalElectionSidos = async ({
  electionCode,
}: {
  electionCode: GeneralElectionCode;
}): Promise<ServerSideGeneralElectionSido[]> => {
  const result = await axios.post(
    `	http://info.nec.go.kr/bizcommon/selectbox/selectbox_cityCodeBySgJson.json`,
    {
      electionId: ELECTION_ID,
      electionCode,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return result.data.jsonResult.body as ServerSideGeneralElectionSido[];
};

export const generalElectionSigungus = async ({
  cityCode,
  electionCode,
}: {
  cityCode: string;
  electionCode: GeneralElectionCode;
}): Promise<ServerSideGeneralElectionSido[]> => {
  const result = await axios.post(
    `http://info.nec.go.kr/bizcommon/selectbox/selectbox_getSggCityCodeJson.json`,
    {
      electionId: ELECTION_ID,
      cityCode,
      electionCode,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return result.data.jsonResult.body as ServerSideGeneralElectionSido[];
};

export const generalElectionElectoralDistricts = async ({
  cityCode,
  electionCode,
}: {
  cityCode: string;
  electionCode: GeneralElectionCode;
}): Promise<ServerSideGeneralElectionElectoralDistrict[]> => {
  console.log({
    electionId: ELECTION_ID,
    electionCode,
    cityCode,
  });
  const result = await axios.post(
    `http://info.nec.go.kr/bizcommon/selectbox/selectbox_townCodeBySgJson.json`,
    {
      electionId: ELECTION_ID,
      electionCode,
      cityCode,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log(result.data);
  return result.data.jsonResult
    .body as ServerSideGeneralElectionElectoralDistrict[];
};

export const generalElectionCandidates = async ({
  cityCode,
  electionCode,
  electoralDistrictCode,
  statementId,
  townCode,
  sggTownCode,
  proportionalRepresentationCode,
}: {
  townCode?: string;
  cityCode?: string;
  electionCode: GeneralElectionCode;
  electoralDistrictCode?: string;
  statementId: string;
  sggTownCode?: string;
  proportionalRepresentationCode?: string;
}): Promise<string> => {
  const result = await axios.post(
    `	http://info.nec.go.kr/electioninfo/electionInfo_report.xhtml`,
    {
      electionId: ELECTION_ID,
      topMenuId: "CP",
      secondMenuId: "CPRI03",
      menuId: "CPRI03",
      requestURI: "/electioninfo/0020240410/cp/cpri03.jsp",
      statementId,
      electionCode,
      cityCode: cityCode || "-1",
      sggCityCode: electoralDistrictCode || "-1",
      proportionalRepresentationCode: proportionalRepresentationCode || "-1",
      townCode: townCode || "-1",
      sggTownCode: sggTownCode || "0",
      dateCode: "0",
      x: "32",
      y: "22",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return result.data;
};
