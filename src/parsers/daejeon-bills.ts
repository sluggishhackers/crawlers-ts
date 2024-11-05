import { load } from "cheerio";
import { Bill } from "@/models/bills";

export const bills = (html: string): Bill[] => {
  const $ = load(html);
  const rows = $(".board_list table tbody tr");
  const bills: Bill[] = [];

  rows.each((_index, row) => {
    const bill: Bill = {
      city: "daejeon",
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
      if ($(col).hasClass("bill_daesu")) {
        bill.term = $(col).text().trim();
      }

      if ($(col).hasClass("bill_billnumber")) {
        bill.number = +$(col).text().trim();
      }

      if ($(col).hasClass("bill_year")) {
        bill.year = +$(col).text().trim();
      }

      if ($(col).hasClass("bill_billname")) {
        bill.title = $(col).text().trim();
        bill.link = `https://council.busan.go.kr${
          $(col).find("a").attr("href")?.trim() || ""
        }`;
      }

      if ($(col).hasClass("bill_billkind")) {
        bill.category = $(col).text().trim();
      }

      if ($(col).hasClass("bill_proposer")) {
        bill.representativeProposer = $(col).text().trim();
      }

      if ($(col).hasClass("bill_committee")) {
        bill.committee = $(col).text().trim();
      }

      if ($(col).hasClass("bill_result")) {
        bill.plenarySessionResult = $(col).text().trim();
      }
    });

    if (bill.number) {
      bills.push(bill);
    }
  });

  return bills;
};
