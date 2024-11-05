import { fetch as fetchSeoulCouncilMinutes } from "@/clients/seoul-council-minutes";
import { seoulCouncilMinutes } from "@/parsers/council-minutes";
import prisma from "@/utils/prisma";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";
import type { NextApiRequest, NextApiResponse } from "next";
import * as solapi from "@/utils/solapi";

const targetsForAll = ["01022774551", "01025905732", "01089093115"];

const targetsBySession: { [key: string]: string } = {
  행정자치위원회: "01027235578",
  기획경제위원회: "01086147528",
  환경수자원위원회: "01067893591",
  문화체육관광위원회: "01044087627",
  보건복지위원회: "01098879634",
  도시안전건설위원회: "01074903396",
  주택공간위원회: "01032187917",
  도시계획균형위원회: "01087940615",
  교통위원회: "01092878414",
  교육위원회: "01026508740",
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetchSeoulCouncilMinutes();
    const regexForCrsf = /_csrf=(.+)",/g;
    const csrf = regexForCrsf.exec(response.data);
    if (csrf && csrf[1]) {
      const result = await seoulCouncilMinutes(response.data, {
        csrf: csrf[1],
        responseCookies: response.headers["set-cookie"],
      });

      const existingCouncilMinutes = await prisma.councilMinute.findFirst({
        where: result,
      });

      if (!existingCouncilMinutes) {
        const councilMinute = await prisma.councilMinute.create({
          data: result,
        });

        const alimtalkParams = {
          apiKey: process.env.SOLAPI_API_KEY_CFOI as string,
          apiSecret: process.env.SOLAPI_API_SECRET_CFOI as string,
          pfId: "KA01PF2404150735259813iVcWinsenr",
          from: "01022774551",
          templateId: "KA01TP241023072924573peRgFaVJNhL",
          variables: {
            "#{위원회명}": `${councilMinute.council} ${councilMinute.sessionTitle} [${councilMinute.meetingType}, ${councilMinute.meetingDates}]`,
            "#{회의월일}": councilMinute.sessionDate,
            "#{크롤링영상링크}": `https://ms.smc.seoul.kr${councilMinute.videoLink}`,
          },
        };

        targetsForAll.forEach(async (mobile) => {
          await solapi.sendAlimtalk({
            ...alimtalkParams,
            mobile,
          });
        });
        await solapi.sendAlimtalk({
          ...alimtalkParams,
          mobile: targetsBySession[councilMinute.sessionTitle],
        });

        await sendMessage({
          text: `📢 ${councilMinute.council} ${councilMinute.sessionTitle} [${councilMinute.meetingType}, ${councilMinute.meetingDates}] (${councilMinute.sessionOrder}) 의회의사록이 업데이트 되었습니다. <https://ms.smc.seoul.kr${councilMinute.videoLink}>`,
          webhookUrl: CHANNEL_WEBHOOK.SLUGGISH_BOT_OGK,
        });
        return res.status(200).json(councilMinute);
      } else {
        await sendMessage({
          text: `📢 업데이트 된 회의록 없음!`,
          webhookUrl: CHANNEL_WEBHOOK.SLUGGISH_BOT_OGK,
        });
      }
      return res.status(200).json(existingCouncilMinutes);
    }

    return res.status(200);
  } catch (e) {
    // console.error(e);
    throw e;
  }
}
