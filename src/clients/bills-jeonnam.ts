import * as https from "https";
import axios from "axios";
import iconv from "iconv-lite";

export const bills = async ({
  daesoo,
  page,
}: {
  daesoo: number;
  page: number;
}): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  return axios({
    method: "get",
    url: `http://bill.jnassembly.go.kr/bills/search/session.do?searchCsDaesoo=${
      daesoo || "12"
    }&searchCsSession=&searchCtUid=&searchBlStatus=&_searchChkProcess=on&pageIndex=${page}&pageUnit=20`,
    httpsAgent,
    responseType: "arraybuffer",
  }).then((res) => iconv.decode(res.data, "EUC-KR"));
};
