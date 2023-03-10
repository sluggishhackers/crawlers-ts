import { load } from "cheerio";
import {
  LocalCommittee,
  LocalCommitteeDetail,
  PositionsForSexRatio,
} from "@/models/local-committee";

export const parseLocalCommitteeDetail = (
  html: string
): LocalCommitteeDetail => {
  const localCommitteeDetail: LocalCommitteeDetail = {
    code: "",
    category: "",
    title: "",
    department: "",
    reference: "",
    basis: "",
    purpose: "",
    roles: "",
    createdDate: null,
    revocatedDate: null,
    status: "",
    sexRatio_civilServant_wichok_male: 0,
    sexRatio_civilServant_wichok_female: 0,
    sexRatio_civilServant_dangyeon_male: 0,
    sexRatio_civilServant_dangyeon_female: 0,
    sexRatio_civilServant_immyeong_male: 0,
    sexRatio_civilServant_immyeong_female: 0,
    sexRatio_civilServant_gonggae_male: 0,
    sexRatio_civilServant_gonggae_female: 0,
    sexRatio_civilian_sido_wichok_male: 0,
    sexRatio_civilian_sido_wichok_female: 0,
    sexRatio_civilian_sido_dangyeon_male: 0,
    sexRatio_civilian_sido_dangyeon_female: 0,
    sexRatio_civilian_sido_immyeong_male: 0,
    sexRatio_civilian_sido_immyeong_female: 0,
    sexRatio_civilian_sido_gonggae_male: 0,
    sexRatio_civilian_sido_gonggae_female: 0,
    sexRatio_civilian_recommendation_wichok_male: 0,
    sexRatio_civilian_recommendation_wichok_female: 0,
    sexRatio_civilian_recommendation_dangyeon_male: 0,
    sexRatio_civilian_recommendation_dangyeon_female: 0,
    sexRatio_civilian_recommendation_immyeong_male: 0,
    sexRatio_civilian_recommendation_immyeong_female: 0,
    sexRatio_civilian_recommendation_gonggae_male: 0,
    sexRatio_civilian_recommendation_gonggae_female: 0,
    sexRatio_civilian_citizen_wichok_male: 0,
    sexRatio_civilian_citizen_wichok_female: 0,
    sexRatio_civilian_citizen_dangyeon_male: 0,
    sexRatio_civilian_citizen_dangyeon_female: 0,
    sexRatio_civilian_citizen_immyeong_male: 0,
    sexRatio_civilian_citizen_immyeong_female: 0,
    sexRatio_civilian_citizen_gonggae_male: 0,
    sexRatio_civilian_citizen_gonggae_female: 0,
    operations: [],
  };

  const $ = load(html);
  const list = $(".board_view ul li");

  list.each((idex: number, item) => {
    const label = $(item).find(".subject").text().trim();
    const value = $(item).find(".txt").text().trim();

    switch (label) {
      case "위원회명":
        localCommitteeDetail.title = value;
        break;
      case "관리부서":
        localCommitteeDetail.department = value;
        break;
      case "문의처":
        localCommitteeDetail.reference = value;
        break;
      case "설치구분":
        localCommitteeDetail.category = value;
        break;
      case "설치근거":
        localCommitteeDetail.basis = value;
        break;
      case "설치목적":
        localCommitteeDetail.purpose = value;
        break;
      case "주요기능":
        localCommitteeDetail.roles = value;
        break;
      case "설치일자":
        localCommitteeDetail.createdDate = value;
        break;
      case "폐지일자":
        localCommitteeDetail.revocatedDate = value;
        break;
      case "활동여부":
        localCommitteeDetail.status = value;
        break;
      case "위원현황": {
        const rows = $(item).find("table tbody tr");
        rows.each((indexForPosition: number, row) => {
          let position: PositionsForSexRatio;
          switch (indexForPosition) {
            case 0:
              position = PositionsForSexRatio.wichok;
              break;
            case 1:
              position = PositionsForSexRatio.dangyeon;
              break;
            case 2:
              position = PositionsForSexRatio.immyeong;
              break;
            case 3:
              position = PositionsForSexRatio.gonggae;
              break;
          }

          const columns = $(row).find("td");
          columns.each((index, col) => {
            switch (index) {
              case 0:
                localCommitteeDetail[`sexRatio_civilServant_${position}_male`] =
                  +$(col).text().trim();
                break;
              case 1:
                localCommitteeDetail[
                  `sexRatio_civilServant_${position}_female`
                ] = +$(col).text().trim();
                break;
              case 2:
                localCommitteeDetail[
                  `sexRatio_civilian_sido_${position}_male`
                ] = +$(col).text().trim();
                break;
              case 3:
                localCommitteeDetail[
                  `sexRatio_civilian_sido_${position}_female`
                ] = +$(col).text().trim();
                break;
              case 4:
                localCommitteeDetail[
                  `sexRatio_civilian_recommendation_${position}_male`
                ] = +$(col).text().trim();
                break;
              case 5:
                localCommitteeDetail[
                  `sexRatio_civilian_recommendation_${position}_female`
                ] = +$(col).text().trim();
                break;
              case 6:
                localCommitteeDetail[
                  `sexRatio_civilian_citizen_${position}_male`
                ] = +$(col).text().trim();
                break;
              case 7:
                localCommitteeDetail[
                  `sexRatio_civilian_citizen_${position}_female`
                ] = +$(col).text().trim();
                break;
            }
          });
        });
        break;
      }
      case "운영현황": {
        const operations: {
          year: number;
          holdingCount: number;
          budget: number;
          expenditure: number;
        }[] = [];

        const rows = $(item).find("table tbody tr");
        rows.each((rowIndex, row) => {
          const columns = $(row).find("td");
          columns.each((colIndex, col) => {
            if (!operations[colIndex]) {
              operations[colIndex] = {
                year: 0,
                holdingCount: 0,
                budget: 0,
                expenditure: 0,
              };
            }

            switch (rowIndex) {
              case 0:
                operations[colIndex].year = +$(col)
                  .text()
                  .trim()
                  .replace(/,/g, "");
                break;
              case 1:
                operations[colIndex].holdingCount = +$(col)
                  .text()
                  .trim()
                  .replace(/,/g, "");
                break;
              case 2:
                operations[colIndex].budget = +$(col)
                  .text()
                  .trim()
                  .replace(/,/g, "");
                break;
              case 3:
                operations[colIndex].expenditure = +$(col)
                  .text()
                  .trim()
                  .replace(/,/g, "");
                break;
            }
          });
        });
        localCommitteeDetail.operations = operations;
        break;
      }
    }
  });

  return localCommitteeDetail;
};

export const parseLocalCommittees = (html: string): LocalCommittee[] => {
  const $ = load(html);
  const rows = $(".board_table_list tbody tr");
  const localCommittees: LocalCommittee[] = [];

  rows.each((_index, row) => {
    const localCommittee: LocalCommittee = {
      category: "",
      title: "",
      roles: "",
      createdDate: "",
      department: "",
      code: "",
    };

    const columns = $(row).find("td");
    columns.each((index, col) => {
      switch (index) {
        case 1:
          localCommittee.category = $(col).text().trim();
          break;
        case 2: {
          localCommittee.title = $(col).text().trim();
          const href = `https://www.daejeon.go.kr${$(col)
            .find("a")
            .attr("href")}`;

          const regexResult = /acmCode=(\d+)/g.exec(href);
          if (regexResult) {
            localCommittee.code = regexResult[1];
          }
          break;
        }
        case 3:
          localCommittee.roles = $(col).text().trim();
          break;
        case 4:
          localCommittee.createdDate = $(col).text().trim();
          break;
        case 5:
          localCommittee.department = $(col).text().trim();
          break;
      }
    });

    localCommittees.push(localCommittee);
  });

  return localCommittees;
};

export const parseLocalCommitteesTotalPagesCount = (html: string): number => {
  const $ = load(html);
  const links = $("a.direction");
  const eventHandler = $(links[links.length - 1]).attr("onclick");
  const regex = /fn_link_page\((\d+)\)/g;

  if (eventHandler) {
    const totalPagesCountResult = regex.exec(eventHandler.split(";")[0]);
    if (totalPagesCountResult) {
      return +totalPagesCountResult[1];
    }
  }

  return 0;
};
