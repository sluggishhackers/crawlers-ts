import { load } from "cheerio";
import { Bill } from "@/models/bills";

export const bill = (bill: Bill, html: string): Bill => {
  const $ = load(html);
  const contents = $(".ViewBoxList");

  contents.each((colIndex, col) => {
    const rows = $(col).find("div.row");
    rows.each((_, row) => {
      const subTitleDiv = $(row).find(".billlist_stitle");
      const subTitle = subTitleDiv?.text().trim() || "";

      switch (subTitle) {
        case "": {
          break;
        }
        default: {
          $(row)
            .find("div.billlist_stext")
            .each((_, text) => {
              bill[subTitle] =
                (bill[subTitle] || "") + "\n" + $(text).text().trim();
              bill[subTitle] = bill[subTitle].trim();
            });
        }
      }

      const subTitleDiv2 = $(row).find(".billlist_stitle2");
      const subTitle2 = subTitleDiv2?.text().trim() || "";

      switch (subTitle2) {
        case "공동발의의원": {
          bill["공동발의의원"] = [];
          $(row)
            .find(".manname")
            .each((_, manname) => {
              bill["공동발의의원"].push($(manname).text().trim());
            });
          break;
        }
        case "제안요지": {
          bill["제안요지"] = $(row).find(".billlist_stext").text().trim();
          break;
        }
        case "": {
          $(row)
            .find("div.col-xs-12.col-sm-12.col-md-8")
            .each((_, col) => {
              const label = (
                $(col).find(".bill_label")?.text().trim() || ""
              ).replaceAll(" ", "");
              const value = $(col).find(".bill_text").text().trim();
              bill[label] = value.replaceAll("--", "");
            });

          $(row)
            .find("div.col-sm-12.col-md-4")
            .each((_, col) => {
              const label = (
                $(col).find(".bill_label")?.text().trim() || ""
              ).replaceAll(" ", "");
              const value = $(col).find(".bill_text").text().trim();
              bill[label] = value.replaceAll("--", "");
            });

          $(row)
            .find("div.col-xs-12.col-sm-12.col-md-12")
            .each((_, col) => {
              const label = (
                $(col).find(".bill_label")?.text().trim() || ""
              ).replaceAll(" ", "");
              const value = $(col).find(".bill_text").text().trim();
              bill[label] = value.replaceAll("--", "");
            });

          $(row)
            .find("div.col-md-12")
            .each((_, col) => {
              const label = (
                $(col).find(".bill_label")?.text().trim() || ""
              ).replaceAll(" ", "");
              const value = $(col).find(".bill_text").text().trim();
              bill[label] = value.replaceAll("--", "");
            });

          break;
        }
        default: {
          const subTables = $(row).find("table.billinTable");
          subTables.each((_, subTable) => {
            const subTableTitle = (
              $(subTable).find("thead tr th")?.text().trim() || ""
            ).replaceAll(" ", "");
            const subTableRowsForKeys = $(subTable).find("tbody tr.tdth");
            const subTableRowsForValues = $(subTable).find("tbody tr.tdtd");

            const subTablekeys: any[] = [];

            subTableRowsForKeys.each((subTableRowIndex, subTableRow) => {
              /**
               * subTableRowIndex: 0, 1
               */
              $(subTableRow)
                .find("td")
                .each((tdIndex, td) => {
                  subTablekeys.push($(td).text().trim().replaceAll(" ", ""));
                });
            });

            subTableRowsForValues.each((subTableRowIndex, subTableRow) => {
              /**
               * subTableRowIndex: 0, 1
               */
              $(subTableRow)
                .find("td")
                .each((tdIndex, td) => {
                  // subTableValues[
                  //   tdIndex + subTableRowIndex + (subTableRowIndex % 2)
                  // ] = $(td).text().trim();

                  const key = `${subTableTitle}_${
                    subTablekeys[
                      tdIndex + subTableRowIndex + (subTableRowIndex % 2)
                    ]
                  }`;

                  bill[key] = $(td).text().trim();
                  if (bill[key].startsWith("가결")) {
                    bill[key] = "가결";
                  }

                  if (bill[key].startsWith("채택")) {
                    bill[key] = "채택";
                  }

                  const discussLink =
                    $(td).find("button").attr("onclick") || "";
                  const discussLinkRegex =
                    /^goProceedings\('(.*)', '(.*)', '(.*)', '(.*)'\)/g;
                  const regexResult = discussLinkRegex.exec(discussLink);
                  if (regexResult) {
                    bill[
                      `${key}_회의록링크`
                    ] = `http://ms.smc.seoul.kr${regexResult[1]}`;
                  }
                });
            });
          });
        }
      }
    });

    const directRowSubTitle =
      $(col).find("div > .billlist_stitle")?.text().trim() || "";
    if (directRowSubTitle) {
      switch (directRowSubTitle) {
        case "첨부파일": {
          bill.files = [];
          $(col)
            .find(".billattachfile p")
            .each((_, file) => {
              const downloadLink = $(file).find("a").attr("href") || "";
              const fileName = $(file).find("a span.attachfile").text().trim();
              const regex = /fileTrans\('(.*)'\)/;
              const fileLink = $(file).find("button").attr("onclick") || "";
              const regexResult = regex.exec(fileLink);
              if (regexResult && regexResult[1]) {
                bill.files.push({
                  name: fileName,
                  downloadLink,
                  viewLink: `https://www.smc.seoul.kr${regexResult[1]}`,
                });
              }
            });
        }
        default: {
          break;
        }
      }
    }
  });

  return bill;
};

export const bills = (html: string): Bill[] => {
  const $ = load(html);
  const rows = $("table.table tbody tr");
  const bills: Bill[] = [];

  rows.each((_index, row) => {
    const bill: Bill = {
      city: "seoul",
    };

    let link = "";
    const onclickValue = $(row).attr("onclick");
    if (onclickValue) {
      const regex = /^goDetail\('(.*)','(.*)','(.*)','(.*)','(.*)'\)/;
      const result = regex.exec(onclickValue);
      if (result) {
        const [_0, propTypeCd, generationNum, billNo, billTypeCd, billNum] =
          result;
        bill.link = `https://www.smc.seoul.kr/info/billRead.do?checkValue=byhomepage&hidNo=&propTypeCd=${propTypeCd}&billNo=${billNo}&billTypeCd=${billTypeCd}&billNum=${billNum}&pageIndex=1&menuId=&boardTypeId=&schCsel=&pageSize=&url=%2FbillSearchDetail.do&startDate=&endDate=&billNm=&generationNum=${generationNum}&propMemberTypeCdName=&propType=0&committee=0&committeeTypeCd=1&billType=0&genmeetResult=0&propTypeCode=0&propMemberTypeCd=10&tempPropMemberTypeCd=10&searchBillNm=`;
      }
    }

    const columns = $(row).find("td");
    columns.each((index, col) => {
      switch (index) {
        case 0:
          bill["번호"] = +$(col).text().trim().split("-")[1];
          bill["대수"] = +$(col).text().trim().split("-")[0];
          break;
        case 1: {
          bill["의안명"] = $(col).text().trim().split("\n")[0];
          bill["소관위원회"] = $(col)
            .find("div.title")
            .text()
            .split(":")[1]
            .trim();
          break;
        }
        case 2: {
          bill["제안자"] = $(col).text().trim();
          break;
        }
        case 3:
          bill["제안일"] = $(col).text().trim().replaceAll(".", "-");
          break;
      }
    });

    if (bill["번호"]) {
      bills.push(bill);
    }
  });

  return bills;
};
