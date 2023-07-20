// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/assembly";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  let page = 1;
  let hasNext = true;

  const members = await fetch.oldMembers({
    page: 1,
    pageSize: 400,
    age: 19,
  });

  res.status(200).json({ members });
}
