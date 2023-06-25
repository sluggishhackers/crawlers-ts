import * as https from "https";
import axios from "axios";

export const fetch = async ({ page }: { page: number }): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://council.busan.go.kr/assem/index.busan?page=${page}&menuCd=DOM_000000103002000000&sGid=9&eGid=&sSid=&eSid=&councilKind=&committeeState=&councilState=&proposer01=&proposer02=&councilTitle=&sdate=&edate=&concilTxt=&search=Y&cId=`,
    {
      httpsAgent,
    }
  );

  return result.data;
};
