import { load } from "cheerio";
import { Bill } from "@/models/bills";

export const bills = (html: string): Bill[] => {
  const $ = load(html);
  const rows = $(".cellType_a tbody tr");
  const bills: Bill[] = [];

  rows.each((_index, row) => {
    const bill: Bill = {
      city: "busan",
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
      if ($(col).hasClass("dae")) {
        bill.number = +$(col).text().trim();
      }

      if ($(col).hasClass("cont")) {
        bill.title = $(col).text().trim();
        bill.link = `https://council.busan.go.kr${
          $(col).find("a").attr("href")?.trim() || ""
        }`;
      }

      if ($(col).hasClass("etc")) {
        switch (index) {
          case 2:
            bill.proposer = $(col).text().trim();
            break;
          case 3: {
            const date = $(col).text().trim();
            bill.proposedDate = date ? date.replace(/\./g, "-") : "";
            break;
          }
          case 4:
            bill.committeeResult = $(col).text().trim() || "";
            break;
          case 5:
            bill.plenarySessionResult = $(col).text().trim() || "";
            break;
        }
      }
    });

    if (bill.number) {
      bills.push(bill);
    }
  });

  return bills;
};
