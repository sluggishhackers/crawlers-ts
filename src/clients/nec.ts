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
};

export const generalElectionSidos = async ({
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
  const result = await axios.post(
    `http://info.nec.go.kr/bizcommon/selectbox/selectbox_townCodeBySgJson.json`,
    {
      electionId: ELECTION_ID,
      electionCode,
      cityCode,
    }
  );

  return result.data.jsonResult
    .body as ServerSideGeneralElectionElectoralDistrict[];
};

export const generalElectionCandidates = async ({
  cityCode,
  electionCode,
  electoralDistrictCode,
  statementId,
}: {
  cityCode: string;
  electionCode: GeneralElectionCode;
  electoralDistrictCode: string;
  statementId: string;
}): Promise<string> => {
  const result = await axios.post(
    `http://info.nec.go.kr/electioninfo/electionInfo_report.xhtml`,
    {
      electionId: ELECTION_ID,
      topMenuId: "PC",
      secondMenuId: "PCRI03",
      menuId: "PCRI03",
      requestURI: "/electioninfo/0020240410/pc/pcri03_ex.jsp",
      statementId,
      electionCode,
      cityCode,
      sggCityCode: electoralDistrictCode,
      townCode: "-1",
      x: "63",
      y: "26",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return result.data;
};
