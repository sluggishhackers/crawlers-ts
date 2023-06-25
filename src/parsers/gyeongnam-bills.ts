import { load } from "cheerio";
import { Bill } from "@/models/bills";

export const bills = (html: string): Bill[] => {
  const $ = load(html);
  const rows = $("#search_result table tbody tr");
  const bills: Bill[] = [];

  rows.each((_index, row) => {
    const bill: Bill = {
      term: "",
      number: 0,
      title: "",
      link: "",
      proposer: "",
      proposedDate: "",
      committee: "",
      committeeResult: "",
      plenarySessionResult: "",
    };

    const columns = $(row).find("td");
    columns.each((index, col) => {
      switch (index) {
        case 0:
          bill.term = $(col).text().trim();
          break;
        case 1:
          bill.number = +$(col).text().trim().split("-")[0];
          break;
        case 2:
          bill.term += ` ${$(col).text().trim()}`;
          break;
        case 3:
          bill.title = $(col).text().trim();
          bill.link = `https://council.gyeongnam.go.kr/kr/activity/bill.do${
            $(col).find("a").attr("href")?.trim() || ""
          }`;
          break;
        case 4:
          bill.representativeProposer = $(col).text().trim();
          break;
        case 5:
          bill.plenarySessionResult = $(col).text().trim();
          break;
      }
    });

    if (bill.number) {
      bills.push(bill);
    }
  });

  return bills;
};
