import * as https from "https";
import axios from "axios";

export const fetch = async ({ page }: { page: number }): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://council.gyeongnam.go.kr/kr/activity/bill.do?councilId=GYEONGSANGNAMDO&sTh=&session=&code=&committeeType=&committeeCode=&proposerType=&memberCode=&proposer=&result=&startDay=&endDay=&subject=&flag=&keyword=&pageNum=${page}`,
    {
      httpsAgent,
    }
  );

  return result.data;
};
