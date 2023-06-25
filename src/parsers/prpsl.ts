import { load } from "cheerio";
import { PrpslDetail } from "@/models/prpsl";

export const prpsl = (html: string): PrpslDetail => {
  const $ = load(html);
  const info = $(".card-list-block .card-info");

  const title = $(info)
    .find(".card-info-top > h4")
    .text()
    .trim()
    .split("\n")[0];

  const category = $(info).find(".card-info-top p").text().split(":")[1].trim();
  let department = "";
  let doneDate = "";
  let proposal = "";
  let improvementPlan = "";
  let promotionPlan = "";
  let promotionResult = "";
  let progress = "";
  let before = $(info).find(".card-info-before").text()?.trim() || "";
  let after = $(info).find(".card-info-after").text()?.trim() || "";
  let type = "알수없음";

  const _steps = $(info).find("ul.card-info-style > li");

  _steps.each((index, step) => {
    const title = $(step).find("h5").text().trim();
    const content = $(step).find("div > p").text().trim();

    switch (title) {
      case "건의":
        proposal = content;
        break;
      case "개선방안":
        improvementPlan = content;
        break;
      case "추진계획":
        promotionPlan = content;
        break;
      case "추진실적":
        promotionResult = content;
        break;
      case "진행상황 및 계획":
        progress = content;

        if (progress.includes("시행령")) {
          type = "시행령";
        }
        if (progress.includes("시행규칙")) {
          type = "시행규칙";
        }
        break;
      case "":
        $(step)
          .find("p")
          .each((index, _p) => {
            const _title = $(_p).find("span").text().trim();
            switch (_title) {
              case "주관부처":
                department = $(_p).text().split(":")[1].trim();
                break;
              case "완료예정":
                doneDate = $(_p).text().split(":")[1].trim();
                break;
            }
          });
        break;
    }
  });

  return {
    title,
    category,
    department,
    doneDate,
    proposal,
    improvementPlan,
    promotionPlan,
    promotionResult,
    progress,
    before,
    after,
    type,
  };
};
