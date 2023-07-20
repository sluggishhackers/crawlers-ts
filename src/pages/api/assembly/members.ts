// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/assembly";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  let page = 1;
  let hasNext = true;

  const result = await fetch.assemblyMembers({
    page: 1,
    pageSize: 10,
    unit: 21,
  });

  res.status(200).json({ success: true });
}
