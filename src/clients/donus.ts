import * as https from "https";
import axios from "axios";

export const fetch = async ({ page }: { page: number }): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.post(
    `https://www.bokjiro.go.kr/ssis-tbu/TWAT52005M/twataa/wlfareInfo/selectWlfareInfo.do`,
    {
      dmScr: {
        curScrId: "tbu/app/twat/twata/twataa/TWAT52005M",
      },
      dmSearchParam: {
        tabId: "1",
        orderBy: "date",
        page,
      },
    },
    {
      httpsAgent,
    }
  );

  return result.data;
};
