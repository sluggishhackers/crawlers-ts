// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/korean-bars";
import * as parser from "@/parsers/korean-bars";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const html = await fetch.disciplines({ page });
    const items = await parser.disciplines(html);

    if (items.length === 0) {
      hasNext = false;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const existingRow = await prisma.koreanBarDiscipline.findFirst({
        where: item,
      });

      if (!existingRow) {
        await prisma.koreanBarDiscipline.create({
          data: item,
        });

        await sendMessage({
          text: `📃 ${item.name}(${item.birthday}) ${item.discipline}`,
          webhookUrl: CHANNEL_WEBHOOK.SLUGGISH_BOT_PEOPLEPOWER,
        });
      }
    }

    page++;
  }

  res.status(200).json({ success: true });
}
