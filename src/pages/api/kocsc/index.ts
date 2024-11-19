// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as kocsc from "@/clients/kocsc";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await kocsc.login({
    name: "김채윤",
    birth: "19970625",
    password: "codbs2wkd!",
  });
  console.log(response);

  res.status(200).json({ success: true });
}
