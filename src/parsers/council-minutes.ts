import { fetchSessionVod } from "@/clients/seoul-council-minutes";
import { load } from "cheerio";

const council = "서울특별시의회";
export const seoulCouncilMinutes = async (
  html: string,
  options: { csrf: string; responseCookies: any }
) => {
  const $ = load(html);
  const contents = $("#sub_general");
  let targetSession: any = { council };

  contents.each((colIndex, col) => {
    const rows = $(col).find("ul.depth1 > li");
    const firstRow = rows[0];

    if (firstRow) {
      const orderWithTitle = $(firstRow).find(".order");
      const regexForOrderWithTitle = /^(\d+)회\[(.+)\]\((.+)\)/g;
      const orderWithTitleText = orderWithTitle.text();
      const result = regexForOrderWithTitle.exec(orderWithTitleText);
      if (result) {
        const [_, meetingNumber, meetingType, meetingDates] = result;
        targetSession = {
          ...targetSession,
          meetingNumber: +meetingNumber,
          meetingType,
          meetingDates,
        };

        const sessions = $(firstRow).find("ul.depth2 > li");
        const lastSession = $(sessions[sessions.length - 1]);
        const key = lastSession.find("a").attr("data-key")?.trim();
        const titleText = lastSession.find("a").text().trim();
        const regexForTitle = /제(\d)차\s+(.+)\((.+)\)/g;
        const resultForSessionTitle = regexForTitle.exec(titleText);
        if (resultForSessionTitle) {
          const [_, sessionOrder, sessionTitle, sessionDate] =
            resultForSessionTitle;
          targetSession = {
            ...targetSession,
            sessionOrder: +sessionOrder,
            sessionTitle,
            sessionDate,
            sessionKey: key,
          };
        }
      }
    }
  });

  const vod = await fetchSessionVod(
    { key: targetSession.sessionKey },
    {
      csrf: options.csrf,
      cookies: options.responseCookies,
    }
  );

  const vodLink = await seoulCouncilMinutesVod(vod.data);
  targetSession.videoLink = vodLink;

  return targetSession;
};

export const seoulCouncilMinutesVod = async (html: string) => {
  const $ = load(html);
  const contents = $("ul.depth2").find("li");
  let targetVod: any = {};

  const content = contents[0];
  if (content) {
    const anchors = $(contents[0]).find("a");
    if (anchors[0]) {
      return $(anchors[0]).attr("href");
    }
  }

  return "";
};
