import * as https from "https";
import axios from "axios";

export const bill = async ({ link }: { link: string }) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  return axios({
    method: "get",
    url: link,
    httpsAgent,
  }).then((res) => res.data);
};

export const bills = async ({
  age,
  page,
}: {
  age?: number;
  page: number;
}): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  return axios({
    method: "get",
    url: `https://www.smc.seoul.kr/info/billSearchDetail.do?checkValue=byhomepage&hidNo=&propTypeCd=&billNo=&billTypeCd=0&billNum=&pageIndex=${page}&menuId=006002003&boardTypeId=&schCsel=&pageSize=&url=/billSearchDetail.do&startDate=&endDate=&billNm=&generationNum=0${age}&propMemberTypeCdName=&propType=0&committee=0&committeeTypeCd=1&billType=0&genmeetResult=0&propTypeCode=0&propMemberTypeCd=10&tempPropMemberTypeCd=10&searchBillNm=`,
    httpsAgent,
  }).then((res) => res.data);
};
