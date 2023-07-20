// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/assembly";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const billId = req.query.id;

  if (!billId) {
    res.status(404).json({ success: false });
    return;
  }

  const result = await fetch.votingResultsOnRegularSession({
    billId: billId as string,
    age: 21,
  });

  res.status(200).json({ votes: result });
}
