// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import * as google from "@/clients/google";
import prisma from "@/utils/prisma";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const orgs = await prisma.statementArticles.findMany({
    where: {
      articleCount: {
        lt: 5,
      },
    },
  });

  for (const org of orgs) {
    const parsedOrg = org.groupName.split(")")[1]
      ? org.groupName.split(")")[1].trim()
      : org.groupName.split(")")[0].trim();

    const json = await google.customSearch({
      query: `"${parsedOrg.replaceAll(
        / /g,
        ""
      )}" AND "성명" AND "계엄" after:2024-12-03`,
    });

    if (json.error?.code) {
      return res.status(json.error.code).json({ message: json.error.message });
    }

    if (json.items?.length && json.items.length > org.articleCount) {
      await prisma.statementArticles.update({
        where: {
          id: org.id,
        },
        data: {
          articleCount: json.items?.length || 0,
          articles: json.items || [],
        },
      });
    }

    console.group(org.groupName);
    console.log(`Updated ${org.groupName}`);
    console.log("Articles Count: ", json.items?.length || 0);
    console.groupEnd();
    await wait(1000);
  }

  res.status(200).json({ success: true });
}
