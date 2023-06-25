import * as https from "https";
import axios from "axios";

export const fetch = async ({ page }: { page: number }): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://council.daejeon.go.kr/svc/cms/bill/BillList.do?pageNo=${page}`,
    {
      httpsAgent,
    }
  );

  return result.data;
};
