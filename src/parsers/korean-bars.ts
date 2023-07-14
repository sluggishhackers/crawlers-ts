import { load } from "cheerio";
import { Discipline } from "@/models/korean-bars";

export const disciplines = (html: string): Discipline[] => {
  const $ = load(html);
  const rows = $("table.table_style4 tbody tr");
  const items: Discipline[] = [];

  rows.each((_index, row) => {
    const item = {} as Discipline;

    const columns = $(row).find("td");

    if (columns.length >= 2) {
      columns.each((index, col) => {
        const value = $(col).text().trim();
        switch (index) {
          case 0:
            item.name = value;
            break;
          case 1:
            const [year, month, date] = value
              .replaceAll(/\(|\)/g, "")
              .slice(0, -1)
              .split(".");
            item.birthday = `${
              +year < 20 ? "20" : "19"
            }${year}-${month}-${date}`;
            break;
          case 2:
            item.affiliation = value;
            break;
          case 3:
            item.address = value;
            break;
          case 4:
            item.discipline = value.replace("\n              \t", " ").trim();
            break;
          case 5:
            item.reason = value;
            break;
          case 6:
            item.date = value.split(".").join("-");
            break;
        }
      });

      items.push(item);
    }
  });

  return items;
};
