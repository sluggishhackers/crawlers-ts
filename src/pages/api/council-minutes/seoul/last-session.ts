import { fetch as fetchSeoulCouncilMinutes } from "@/clients/seoul-council-minutes";
import { seoulCouncilMinutes } from "@/parsers/council-minutes";
import prisma from "@/utils/prisma";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";
import { AxiosHeaderValue } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

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
        responseCookies: response.headers["set-cookie"] as AxiosHeaderValue,
      });

      console.log(result);
      const existingCouncilMinutes = await prisma.councilMinute.findFirst({
        where: result,
      });

      if (!existingCouncilMinutes) {
        const councilMinute = await prisma.councilMinute.create({
          data: result,
        });

        await sendMessage({
          text: `📢 ${councilMinute.council} ${councilMinute.sessionTitle} (${councilMinute.sessionOrder}) 의회의사록이 업데이트 되었습니다. <https://ms.smc.seoul.kr${councilMinute.videoLink}>`,
          webhookUrl: CHANNEL_WEBHOOK.SLUGGISH_BOT_BTOB,
        });
        return res.status(200).json(councilMinute);
      }
      return res.status(200).json(existingCouncilMinutes);
    }

    return res.status(200);
  } catch (e) {
    // console.error(e);
    throw e;
  }
}
