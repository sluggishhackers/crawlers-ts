// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/assembly";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
