import axios, { AxiosHeaderValue } from "axios";
import * as https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const fetch = () => {
  return axios.get("https://ms.smc.seoul.kr/kr/cast/vod2.do", {
    httpsAgent,
  });
};

export const fetchSessionVod = (
  { key }: { key: string },
  options: { csrf: string; cookies: AxiosHeaderValue }
) => {
  return axios.post(
    `https://ms.smc.seoul.kr/kr/cast/ajaxItemList.do?_csrf=${options.csrf}`,
    {
      key,
      _crsf: options.csrf,
    },
    {
      httpsAgent,
      headers: {
        Cookie: (options.cookies! as string[]).join("; "),
        "X-CSRF-TOKEN": options.csrf,
      },
    }
  );
};
