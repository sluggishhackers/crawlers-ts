// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/mfds";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  for (let page = 1; page < 5; page++) {
    const items = await fetch.shortItems({ page });
    if (items.length === 0) {
      break;
    }

    for (const _item of items) {
      const item = await fetch.shortItem({ slReportId: _item.slReportSeq });

      const existingRow = await prisma.mfdsShortItem.findFirst({
        where: {
          slReportSeq: _item.slReportSeq,
        },
      });

      if (!existingRow) {
        await prisma.mfdsShortItem.create({
          data: item,
        });

        try {
          await sendMessage({
            text: `[📃  생산/수입/공급부족 보고 의약품]\n이름: (${item.slReportSeq})${item.itemName}\n사유: ${item.slReason}`,
            webhookUrl: CHANNEL_WEBHOOK.SLUGGISH_BOT_PHARMACIST,
          });
        } catch (_) {}
      }
    }
  }

  res.status(200).json({ success: true });
}
