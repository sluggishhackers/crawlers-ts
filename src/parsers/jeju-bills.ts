import { load } from "cheerio";
import { Bill } from "@/models/bills";

export const bills = (html: string): Bill[] => {
  const $ = load(html);
  const rows = $(".list tbody tr");
  const bills: Bill[] = [];

  rows.each((_index, row) => {
    const bill: Bill = {
      city: "jeju",
      number: 0,
      term: "",
      title: "",
      link: "",
      representativeProposer: "",
      proposedDate: "",
      committeeResult: "",
      plenarySessionResult: "",
    };

    const columns = $(row).find("td");
    columns.each((index, col) => {
      switch (index) {
        case 0:
          bill.number = +$(col).text().trim().split("-")[1];
          bill.term = $(col).text().trim().split("-")[0];
          break;
        case 1:
          bill.term += `-${$(col).text().trim()}`;
          break;
        case 2:
          bill.proposedDate = $(col).text().trim();
          break;
        case 3:
          bill.title = $(col).text().trim();
          bill.link = `https://www.council.jeju.kr${
            $(col).find("a").attr("href")?.trim() || ""
          }`;
          break;
        case 4:
          bill.representativeProposer = $(col).text().trim();
          break;
        case 5:
          bill.committee = $(col).text().trim();
          break;
        case 6:
          bill.plenarySessionResult = $(col).text().trim();
          break;
      }
    });

    bills.push(bill);
  });

  return bills;
};
