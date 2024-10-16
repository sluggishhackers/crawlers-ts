import axios from "axios";
import * as https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const fetch = () => {
  return axios.get("https://ms.smc.seoul.kr/kr/cast/vod2.do", {
    httpsAgent,
  });
};

export const fetchSessionVod = ({ key }: { key: string }) => {
  return axios.post(
    "https://ms.smc.seoul.kr/kr/cast/ajaxItemList.do?_csrf=794f6d6e-e824-4f3d-bc8a-0f87597afceb",
    {
      key,
    },
    {
      headers: {
        Cookie:
          "WL_PCID=27149403130637326340983; WMONID=D54GNciin8a; JSESSIONID=546C7F46700EC7401FCC6A26F4FD4822.tomcat2",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      httpsAgent,
    }
  );
};
