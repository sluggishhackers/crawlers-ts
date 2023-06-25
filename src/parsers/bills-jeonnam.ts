import { load } from "cheerio";
import { Bill } from "@/models/bills";

export const bills = (html: string): Bill[] => {
  const $ = load(html);
  const rows = $("#sub-contents table tbody tr");
  const bills: Bill[] = [];

  rows.each((_index, row) => {
    const bill: Bill = {
      city: "jeonnam",
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
          bill.number = +$(col).text().trim().split("-")[1];
          bill.term = `${$(col).text().trim().split("-")[0]}대`;
          break;
        case 1:
          bill.title =
            $(col).find("a").attr("title")?.trim() || $(col).text().trim();
          bill.link = $(col).find("a").attr("href")?.trim() || "";
          break;
        case 2: {
          bill.representativeProposer = $(col).text().trim();
          break;
        }
        case 3: {
          bill.committee =
            $(col).find("a").attr("title")?.trim() || $(col).text().trim();
          break;
        }
        case 4:
          bill.proposedDate = $(col).text().trim().replaceAll(".", "-");
          break;
        case 5:
          bill.committeeResult = $(col).text()?.trim().replace("-", "") || "";
          break;
        case 6:
          bill.plenarySessionResult =
            $(col).text()?.trim().replace("-", "") || "";
          break;
      }
    });

    if (bill.number) {
      bills.push(bill);
    }
  });

  return bills;
};
