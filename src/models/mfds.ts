export type ServerSideSuspendedItem = {
  suspendReportSeq: string;
  suspendReportGb: "수입" | "생산";
  entpSeq: string;
  entpName: string;
  itemSeq: string;
  itemName: string;
  suspendDate: string;
  lackDate: string;
  reportDate: string;
  suspendReason: string;
  supplyLackPaci: string;
  supplyPlan: string;
  chargeName: string;
  chargeTel: string;
  lastSupplyDate: "string";
  lastReportGb: "수입" | "생산";
  lastSupplyGb: "Y" | "N";
  suspendGb: "수입" | "생산";
  suspendYn: "Y" | "N";
};

export type SuspendedItem = {
  corpName: string;
  corpId: number;
  productId: number;
  productName: string;
  suspendedReportId: number;
  suspendedReportType: "수입" | "생산";
  reportDate: string;
  suspendedDate?: string;
  suspendedReason?: string;
  lackPossibility?: string;
  lackDate?: string;
  plan?: string;
  chargeName?: string;
  chargeTel?: string;
  lastSupplyDate?: "string";
  lastReportType?: "수입" | "생산";
  lastSupplyYN?: "Y" | "N";
  suspendedType?: "수입" | "생산";
  suspendedYn?: "Y" | "N";
};