import * as https from "https";
import axios from "axios";

export const bill = async ({}) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  return axios({
    method: "get",
    url: `https://www.smc.seoul.kr/info/billRead.do?checkValue=byhomepage&hidNo=&propTypeCd=01&billNo=01667&billTypeCd=3&billNum=1&pageIndex=1&menuId=006002003&boardTypeId=&schCsel=&pageSize=&url=%2FbillSearchDetail.do&startDate=&endDate=&billNm=&generationNum=011&propMemberTypeCdName=&propType=0&committee=0&committeeTypeCd=1&billType=0&genmeetResult=0&propTypeCode=0&propMemberTypeCd=10&tempPropMemberTypeCd=10&searchBillNm=`,
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
