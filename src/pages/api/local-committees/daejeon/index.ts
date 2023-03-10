// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/daejeon-local-committees";
import * as parser from "@/parsers/daejeon-local-committees";
import { sendMessage } from "@/utils/slack";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const page = 1;

  const result = await fetch.fetchLocalCommittees({ page });
  const committees = await parser.parseLocalCommittees(result);

  for (let i = 0; i < committees.length; i++) {
    const c = committees[i];
    const detail = await fetch.fetchLocalCommitteeDetail({ code: c.code });
    const detailParsed = await parser.parseLocalCommitteeDetail(detail);

    const existing = await prisma.lcCommittee.findUnique({
      where: { code: c.code },
    });

    if (existing && i === 0) {
      sendMessage({
        text: `[대전시] 새로 추가된 지역외원회가 없습니다.`,
        webhookUrl: process.env.SLACK_WEBHOOK_URL,
      });
    }

    if (!existing) {
      await prisma.lcCommittee.create({
        data: {
          ...detailParsed,
          code: c.code,
        },
      });

      sendMessage({
        text: `[대전시] 새로운 지역위원회가 추가되었습니다. ${detailParsed.title}`,
      });
    }
  }

  res.status(200).json({ success: true });
}
