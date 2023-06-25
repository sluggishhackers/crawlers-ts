import { load } from "cheerio";
import type {
  CmmCd,
  ServerSideServiceList,
  ServiceInfo,
  ServiceInfoToInsert,
  WelfareOrder,
  WlfareInfoReldBztpCd,
} from "../models/bokjiro";

const detailFor03 = (html: string) => {
  let _parsed = "";
  const regexForDetail = /dmCvlwlBiz":"(.*)","dsCvlwlFile/g;
  const detailResult = regexForDetail.exec(html.replace(/", "/g, '","'));
  _parsed = `"${detailResult?.[1] || "{}"}"`;
  const _detail: ServiceInfo = JSON.parse(`${JSON.parse(_parsed)}`);
  const cmmCd: CmmCd = {};
  const cmmCdStr = _detail.cmmCdNm;
  cmmCdStr.split(";").forEach((item) => {
    const [key, value] = item.split(":") as [keyof CmmCd, string];
    cmmCd[key] = value;
  });

  let dateFrom = "";
  let dateTo = "";
  const dates =
    _detail.cvlwlInfoPvsnYmd?.replace(/[ |\n]/g, "").split("~") || "";
  if (dates) {
    _detail.cvlwlInfoPvsnYmd = undefined;
    dateFrom = dates[0];
    dateTo = dates[1];
  }

  _detail.id = _detail.wlfareInfoId!;
  _detail.wlfareInfoId = undefined;
  _detail.wlfareInfoOutlCn =
    _detail.wlfareInfoOutlCn || _detail.bizPrpsCn || "";
  _detail.bizPrpsCn = undefined;
  _detail.serviceContents = _detail.wlfareInfoDtlCn
    ? [_detail.wlfareInfoDtlCn]
    : [];
  _detail.wlfareInfoDtlCn = undefined;

  _detail.applyWays = _detail.aplyMtdDc ? [_detail.aplyMtdDc] : [];
  _detail.aplyMtdDc = undefined;

  _detail.targets = _detail.wlfareSprtTrgtCn ? [_detail.wlfareSprtTrgtCn] : [];
  _detail.wlfareSprtTrgtCn = undefined;

  _detail.ctpvStdgCd = undefined;
  _detail.sggStdgCd = undefined;
  _detail.faclHmpgUrl = undefined;
  _detail.aplyPageUrl = undefined;
  _detail.cvlwlRegScd = undefined;
  _detail.cvlwlProgGdncMtdCd = undefined;
  _detail.rjctRsnCn = undefined;
  _detail.aprvDt = undefined;
  _detail.cvlwlRscCcd = undefined;
  _detail.etcAtcflId = undefined;
  _detail.inqTmcnt = undefined;
  _detail.useYn = undefined;

  const detail: ServiceInfoToInsert = {
    ..._detail,
    dateFrom,
    dateTo,
    wlfareInfoNm: `${_detail.cvlwlBizNm} - ${_detail.cvlwlBizRegTeamNm}` || "",
    selectionCriterias: "",
    targets: _detail.targets.join("\n"),
    applyWays: _detail.applyWays.join("\n"),
    serviceContents: _detail.serviceContents.join("\n"),
    link: `https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52015M.do?wlfareInfoId=${_detail.id}&wlfareInfoReldBztpCd=${_detail.wlfareInfoReldBztpCd}`,
  };

  return {
    detail,
    cmmCd,
  };
};

const detailForDefault = (html: string) => {
  const applyWays: string[] = [];
  const targets: string[] = [];
  const selectionCriterias: string[] = [];
  const serviceContents: string[] = [];
  const cmmCd: CmmCd = {};

  let _parsed = "";
  const regexForDetail = /dmWlfareInfo":"(.*)","dmWlfareInfoCase/g;
  const detailResult = regexForDetail.exec(html.replace(/", "/g, '","'));
  _parsed = `"${detailResult?.[1] || "{}"}"`;
  try {
    if (!detailResult?.[1]) {
      throw new Error();
    }

    const a = JSON.parse(_parsed);
  } catch (e) {
    const regexForDetailAgain = /dmWlfareInfo":"(.*)","dsWlfareInfoDtl/g;
    const detailResultAgain = regexForDetailAgain.exec(
      html.replace(/", "/g, '","')
    );
    _parsed = `"${detailResultAgain?.[1] || "{}"}"`;

    try {
      if (!detailResultAgain?.[1]) {
        throw new Error();
      }
      JSON.parse(_parsed);
    } catch (e) {
      throw new Error(
        `페이지 해석에 문제가 발생했습니다 - page: ${options?.page}, index: ${options?.index}`
      );
    }
  }

  const _detail: ServiceInfo = JSON.parse(`${JSON.parse(_parsed)}`);
  _detail.id = _detail.wlfareInfoId!;
  _detail.wlfareInfoId = undefined;

  try {
    const targetsHtml = load(_detail.wlfareSprtTrgtCn!);
    const _targets = targetsHtml("li");
    _targets.each((_, item) => {
      targets.push(targetsHtml(item).text());
    });
  } catch (_) {
    targets.push(_detail.wlfareSprtTrgtCn!);
  }
  _detail.wlfareSprtTrgtCn = undefined;

  if (_detail.aplyMtdDc) {
    const applyWayHtml = load(_detail.aplyMtdDc!);
    const _applyWays = applyWayHtml("li");
    _applyWays.each((index, item) => {
      applyWays.push(applyWayHtml(item).text());
    });

    const selectionCrieriasHtml = load(_detail.wlfareSprtTrgtSlcrCn!);
    const _selectionCrierias = applyWayHtml("li");
    _selectionCrierias.each((index, item) => {
      selectionCriterias.push(selectionCrieriasHtml(item).text());
    });
  } else {
    selectionCriterias.push(_detail.wlfareSprtTrgtSlcrCn || "");
  }
  _detail.aplyMtdDc = undefined;
  _detail.wlfareSprtTrgtSlcrCn = undefined;

  const serviceContentsHtml = load(_detail.wlfareSprtBnftCn!);
  const _serviceContents = serviceContentsHtml("li");
  _serviceContents.each((index, item) => {
    serviceContents.push(serviceContentsHtml(item).text());
  });
  _detail.wlfareSprtBnftCn = undefined;

  const cmmCdStr = _detail.cmmCdNm;
  cmmCdStr.split(";").forEach((item) => {
    const [key, value] = item.split(":") as [keyof CmmCd, string];
    cmmCd[key] = value;
  });

  const regexForWays = /dsWlfareInfoDtl":"(.*)","dsDupInfo"/g;
  const waysForResult = regexForWays.exec(html);
  const _parsedFromWays = `"${waysForResult?.[1] || "[]"}"`;
  const applyOrders: WelfareOrder[] = JSON.parse(
    `${JSON.parse(_parsedFromWays)}`
  );

  const detail: ServiceInfoToInsert = {
    ..._detail,
    id: _detail.id!,
    link: `https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=${_detail.id}&wlfareInfoReldBztpCd=${_detail.wlfareInfoReldBztpCd}`,
    applyWays: applyWays.join("\n"),
    serviceContents: serviceContents.join("\n"),
    selectionCriterias: selectionCriterias.join("\n"),
    targets: targets.join("\n"),
  };

  return {
    detail,
    cmmCd,
    applyOrders,
  };
};

export const detail = (
  html: string,
  options?: {
    page?: number;
    index?: number;
    type: WlfareInfoReldBztpCd;
  }
): {
  detail: ServiceInfoToInsert;
  cmmCd: CmmCd;
  applyOrders?: WelfareOrder[];
} => {
  if (options?.type === "03") {
    return detailFor03(html);
  }

  return detailForDefault(html);
};

export const list = (response: ServerSideServiceList) => {
  return response.dsServiceList0;
};
