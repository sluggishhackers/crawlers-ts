// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/jeju-bills";
import * as parser from "@/parsers/jeju-bills";
import { sendMessage } from "@/utils/slack";

const CITY_NAME = "jeju";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});

  let currentPage = 1;
  let hasMorePage = true;

  while (hasMorePage) {
    console.log("fetching bills page: ", currentPage);
    const listResponse = await fetch.bills({ page: currentPage });
    const bills = await parser.bills(listResponse);

    if (!bills.length) {
      hasMorePage = false;
    }

    for (const bill of bills) {
      const existingRow = await prisma.bill.findFirst({
        where: {
          number: bill.number,
          term: bill.term,
          city: CITY_NAME,
        },
      });

      if (!existingRow) {
        // await prisma.bill.create({
        //   data: {
        //     ...bill,
        //     city: CITY_NAME,
        //   },
        // });

        await sendMessage({
          text: `📃 ${CITY_NAME} ${bill.number} ${bill.title} ${bill.link}`,
        });
      }
    }

    currentPage++;
  }

  res.status(200).json({ success: true });
}
