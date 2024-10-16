import qs from "qs";
import * as https from "https";
import axios from "axios";
import {
  ServerSideShortItem,
  ServerSideSuspendedItem,
  ShortItem,
  SuspendedItem,
} from "@/models/mfds";

export const drugs = async ({ page }: { page: number }) => {
  const query = qs.stringify({
    sort: "",
    sortOrder: false,
    searchYn: true,
    ExcelRowdata: "",
    page,
    searchDivision: "detail",
    itemName: "",
    itemEngName: "",
    entpName: "",
    entpEngName: "",
    ingrName1: "",
    ingrName2: "",
    ingrName3: "",
    ingrEngName: "",
    itemSeq: "",
    stdrCodeName: "",
    atcCodeName: "",
    indutyClassCode: "",
    sClassNo: "",
    narcoticKindCode: "",
    cancelCode: "",
    etcOtcCode: "",
    makeMaterialGb: "",
    searchConEe: "AND",
    eeDocData: "",
    searchConUd: "AND",
    udDocData: "",
    searchConNb: "AND",
    nbDocData: "",
    startPermitDate: "",
    endPermitDate: "",
  });

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const result = await axios.get(
    `https://nedrug.mfds.go.kr/searchDrug?${query}`,
    {
      httpsAgent,
    }
  );

  return result.data;
};

export const suspendedItems = async ({
  page,
}: {
  page: number;
}): Promise<SuspendedItem[]> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `	https://nedrug.mfds.go.kr/pbp/CCBAF01/getList?totalPages=70&page=${page}&limit=10&sort=&sortOrder=&searchYn=&itemName=&entpName=&reportDateStart=&reportDateEnd=`,
    {
      httpsAgent,
    }
  );

  const items = result.data.list as ServerSideSuspendedItem[];

  return items.map((item) => ({
    corpId: Number(item.entpSeq),
    corpName: item.entpName,
    productId: Number(item.itemSeq),
    productName: item.itemName,
    reportDate: item.reportDate,
    suspendedReportId: Number(item.suspendReportSeq),
    suspendedReportType: item.suspendReportGb,
  })) as SuspendedItem[];
};

export const suspendedItem = async ({
  suspendedReportId,
}: {
  suspendedReportId: number;
}): Promise<SuspendedItem> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://nedrug.mfds.go.kr/pbp/CCBAF01/getItem?totalPages=70&limit=10&page=2&=&suspendReportSeq=${suspendedReportId}`,
    {
      httpsAgent,
    }
  );

  const item: ServerSideSuspendedItem = result.data.item;

  return {
    suspendedDate: item.suspendDate,
    suspendedReason: item.suspendReason,
    lackPossibility: item.supplyLackPaci,
    lackDate: item.lackDate,
    plan: item.supplyPlan,
    chargeName: item.chargeName,
    chargeTel: item.chargeTel,
    lastSupplyDate: item.lastSupplyDate,
    lastReportType: item.lastReportGb,
    lastSupplyYN: item.lastSupplyGb,
    suspendedType: item.suspendGb,
    suspendedYn: item.suspendYn,
  } as SuspendedItem;
};

export const shortItems = async ({
  page,
}: {
  page: number;
}): Promise<ShortItem[]> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://nedrug.mfds.go.kr/pbp/CCBAG01/getList?totalPages=33&page=${page}&limit=10&sort=&sortOrder=&searchYn=true&itemName=&entpName=&reportDateStart=&reportDateEnd=&btnSearch=`,
    {
      httpsAgent,
    }
  );

  const items = result.data.list as ServerSideShortItem[];
  return items.map((item) => ({
    sysGbCode: item.sysGbCode,
    entpName: item.entpName,
    itemName: item.itemName,
    reportDate: item.reportDate,
    reporterAddr: item.reporterAddr,
    reporterName: item.reporterName,
    slOccurExpectDate: item.slOccurExpectDate,
    slReason: item.slReason,
    lastSupplyDate: item.lastSupplyDate,
    lackQyDate: item.lackQyDate,
    patientMdlrtAffc: item.patientMdlrtAffc,
    supplyPlan: item.supplyPlan,
    supplyPlanDate: item.supplyPlanDate,
    chargeName: item.chargeName,
    chargeTelNo: item.chargeTelNo,
    examResultDt: item.examResultDt,
    reasonDocNo: item.reasonDocNo,
    deptReceiptNo: item.deptReceiptNo,
    entpNo: Number(item.entpNo),
    entpSeq: Number(item.entpSeq),
    itemSeq: Number(item.itemSeq),
    slReportSeq: item.slReportSeq,
    lackQy: item.lackQy,
    ediStdCode: item.ediStdCode,
  })) as ShortItem[];
};

export const shortItem = async ({
  slReportId,
}: {
  slReportId: string;
}): Promise<ShortItem> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://nedrug.mfds.go.kr/pbp/CCBAG01/getItem?totalPages=70&limit=10&page=2&=&slReportSeq=${slReportId}`,
    {
      httpsAgent,
    }
  );

  const item: ServerSideShortItem = result.data.item;
  return {
    sysGbCode: item.sysGbCode,
    entpName: item.entpName,
    itemName: item.itemName,
    reportDate: item.reportDate,
    reporterAddr: item.reporterAddr,
    reporterName: item.reporterName,
    slOccurExpectDate: item.slOccurExpectDate,
    slReason: item.slReason,
    lastSupplyDate: item.lastSupplyDate,
    lackQyDate: item.lackQyDate,
    patientMdlrtAffc: item.patientMdlrtAffc,
    supplyPlan: item.supplyPlan,
    supplyPlanDate: item.supplyPlanDate,
    chargeName: item.chargeName,
    chargeTelNo: item.chargeTelNo,
    examResultDt: item.examResultDt,
    reasonDocNo: item.reasonDocNo,
    deptReceiptNo: item.deptReceiptNo,
    entpNo: Number(item.entpNo),
    entpSeq: Number(item.entpSeq),
    itemSeq: Number(item.itemSeq),
    slReportSeq: item.slReportSeq,
    lackQy: item.lackQy,
    ediStdCode: item.ediStdCode,
  } as ShortItem;
};
