// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAssemblyBillsEtcOnRegularSessions } from "@/crawlers/assembly";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetchAssemblyBillsEtcOnRegularSessions({
    age: 20,
    page: 1,
    pageSize: 100,
  });

  res.status(200).json({ votes: result });
}
