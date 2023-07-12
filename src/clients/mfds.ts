import * as https from "https";
import axios from "axios";
import { ServerSideSuspendedItem, SuspendedItem } from "@/models/mfds";

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
