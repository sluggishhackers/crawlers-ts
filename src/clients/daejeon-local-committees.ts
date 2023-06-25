import axios from "axios";
import * as https from "https";

export const fetchLocalCommitteeDetail = async ({
  code,
}: {
  code: string;
}): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://www.daejeon.go.kr/drh/acm/drhAcmBoardView.do?acmCode=${code}`,
    {
      httpsAgent,
    }
  );

  return result.data;
};

export const fetchLocalCommittees = async ({
  page,
}: {
  page: number;
}): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.post(
    "https://www.daejeon.go.kr/drh/acm/drhAcmBoardList.do",
    {
      pageIndex: page,
      menuSeq: 6412,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      httpsAgent,
    }
  );

  return result.data;
};
