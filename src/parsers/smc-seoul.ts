import { load } from "cheerio";
import { Bill } from "@/models/bills";

export const bill = (bill: Bill, html: string): Bill => {
  const $ = load(html);
  const contents = $(".ViewBoxList");

  contents.each((colIndex, col) => {
    const rows = $(col).find("div.row");
    rows.each((_, row) => {
      const labelNode = $(row).find(".bill_label");

      if (labelNode) {
        const label = $(row).find(".bill_label").text().trim();
        const value = $(row).find(".bill_text").text().trim();

        switch (label) {
          case "의안종류": {
            bill.kind = value;
            break;
          }
          case "의안구분": {
            bill.category = value;
            break;
          }
          case "집행기관 이송일": {
            bill.transferedDateToExecutingAgency = value;
            break;
          }
          case "공포번호": {
            bill.gazetteNumber = value;
            break;
          }
          case "공포일": {
            bill.gazetteDate = value;
          }
          case "철회/재의": {
            bill.withdrawal = value;
          }
        }
      }
    });
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
        case 1: {
          bill.title = $(col).text().trim().split("\n")[0];
          bill.committee = $(col).find("div.title").text().split(":")[1].trim();
          console.log(bill.committee);
          break;
        }
        case 2: {
          bill.representativeProposer = $(col).text().trim();
          break;
        }
        case 3:
          bill.proposedDate = $(col).text().trim().replaceAll(".", "-");
          break;
      }
    });

    if (bill.number) {
      bills.push(bill);
    }
  });

  return bills;
};
