import * as https from "https";
import axios from "axios";

export const fetch = async ({ page }: { page: number }): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://www.icouncil.go.kr/council/council.do?act=billreport&daesu=9&kind=proposal&pageno=${page}`,
    {
      httpsAgent,
    }
  );

  return result.data;
};
