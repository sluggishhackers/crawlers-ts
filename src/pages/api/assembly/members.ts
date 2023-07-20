// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchMembers } from "@/crawlers/assembly";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  let page = 1;
  let hasNext = true;

  const members = await fetchMembers({
    page: 1,
    pageSize: 400,
  });

  res.status(200).json({ members });
}
