import { load } from "cheerio";
import { Bill } from "@/models/bills";

export const bills = (html: string): Bill[] => {
  const $ = load(html);
  const rows = $(".general_board tbody tr");
  const bills: Bill[] = [];

  rows.each((_index, row) => {
    const bill: Bill = {
      number: 0,
      title: "",
      link: "",
      representativeProposer: "",
      proposer: "",
      proposedDate: "",
      committeeResult: "",
      plenarySessionResult: "",
    };

    const columns = $(row).find("td");
    columns.each((index, col) => {
      if ($(col).hasClass("center")) {
        switch (index) {
          case 0:
            bill.number = +$(col).text().trim();
            break;
          case 2:
            bill.representativeProposer = $(col).text().trim();
            break;
          case 4:
            const date = $(col).text().trim();
            bill.proposedDate = date ? date.replace(/\./g, "-") : "";
            break;
          case 5:
            bill.plenarySessionResult = $(col).text().trim();
            break;
        }
      }

      if ($(col).hasClass("title")) {
        bill.title = $(col).text().trim();
        bill.link = `https://www.icouncil.go.kr${
          $(col).find("a").attr("href")?.trim() || ""
        }`;
      }

      if (index === 3) {
        bill.proposer = $(col).text().trim();
      }
    });

    if (bill.number) {
      bills.push(bill);
    }
  });

  return bills;
};
