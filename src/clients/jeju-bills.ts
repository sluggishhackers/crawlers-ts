import * as https from "https";
import axios from "axios";

export const bills = async ({ page }: { page: number }): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://www.council.jeju.kr/activity/bill/info/12dae.do?dataType=&num=012&result=&type=&comm=&sdate=&edate=&proposer=&name=&word=&page=${page}`,
    {
      httpsAgent,
    }
  );

  return result.data;
};
