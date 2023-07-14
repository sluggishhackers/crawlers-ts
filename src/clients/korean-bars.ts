import axios from "axios";
import * as https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const disciplines = async ({ page }: { page: number }) => {
  const result = await axios.get(
    `https://www.koreanbar.or.kr/pages/discipline/list.asp?category=&searchstr=&searchtype=&page=${page}`,
    {
      httpsAgent,
    }
  );

  return result.data;
};
