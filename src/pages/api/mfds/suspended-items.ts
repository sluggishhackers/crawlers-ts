// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/mfds";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";
import { SuspendedItem } from "@/models/mfds";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  for (let page = 1; page < 10; page++) {
    const items = await fetch.suspendedItems({ page });

    for (const _item of items) {
      const itemDetail = await fetch.suspendedItem({
        suspendedReportId: _item.suspendedReportId,
      });

      const item: SuspendedItem = {
        ..._item,
        ...itemDetail,
      };

      const existingRow = await prisma.mfdsSuspendedItem.findFirst({
        where: {
          suspendedReportId: _item.suspendedReportId,
        },
      });

      if (!existingRow) {
        await prisma.mfdsSuspendedItem.create({
          data: item,
        });

        try {
          await sendMessage({
            text: `[📃 생산/수입/공급중단 보고 의약품]\n이름: (${item.suspendedReportId})${item.productName}\n사유: ${item.suspendedReason}`,
            webhookUrl: CHANNEL_WEBHOOK.SLUGGISH_BOT_PHARMACIST,
          });
        } catch (_) {}
      }
    }
  }

  res.status(200).json({ success: true });
}
