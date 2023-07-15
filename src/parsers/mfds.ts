import { load } from "cheerio";
import { SuspendedItem } from "@/models/mfds";

export const suspendedItems = (html: string): SuspendedItem[] => {
  const $ = load(html);
  const rows = $("table.tb_list tbody tr");
  const items: SuspendedItem[] = [];

  rows.each((_index, row) => {
    const item = {} as SuspendedItem;

    const columns = $(row).find("td");
    columns.each((index, col) => {
      const value = $(col).find(".span").last();
      switch (index) {
        case 1:
          item.reportDate = value.text().trim();
          break;
        case 2:
          item.corpName = value.text().trim();
          break;
        case 3:
          item.productName = value.find("a").text().trim();
          const itemHref = value.find("a").attr("href")?.trim();
          if (itemHref) {
            const regex = /suspendReportSeq=\('(\d+)'\)/;
            const idResult = regex.exec(itemHref);
            if (idResult) {
              item.productId = Number(idResult[1]);
            }
          } else {
            item.productId = 0;
          }
          break;
      }
    });

    items.push(item);
  });

  return items;
};
