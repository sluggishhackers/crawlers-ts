import axios from "axios";
import * as https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const fetch = ({
  sTh,
  committeeCode,
  councilId,
  x,
  y,
}: {
  sTh?: number;
  committeeCode: string;
  councilId?: string;
  x?: number;
  y?: number;
}) => {
  return axios.get(
    `https://ms.smc.seoul.kr/kr/cast/vod2.do?sTh=${
      sTh || 11
    }&committeeCode=${committeeCode}&councilId=${councilId || "SEOUL"}&x=${
      x || 28
    }&y=${y || 12}`,
    {
      httpsAgent,
    }
  );
};

export const fetchSessionVod = (
  { key }: { key: string },
  options: { csrf: string; cookies: any }
) => {
  const _cookies =
    (options.cookies! as string[])
      .map((cookie) => cookie.split(";")[0])
      .join(";") || "";

  return axios.post(
    `https://ms.smc.seoul.kr/kr/cast/ajaxItemList.do?_csrf=${options.csrf}`,
    {
      key,
      _crsf: options.csrf,
    },
    {
      httpsAgent,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie: _cookies,
      },
    }
  );
};
