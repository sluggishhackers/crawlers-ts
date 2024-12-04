// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import * as google from "@/clients/google";
import prisma from "@/utils/prisma";
import { orgs, OrgTypes } from "@/constants/statements-orgs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const group = (req.query.group || "사회단체") as OrgTypes;
  const targetOrgs = orgs[group];
  for (const org of targetOrgs) {
    const parsedOrg = org.split(")")[1]
      ? org.split(")")[1].trim()
      : org.split(")")[0].trim();

    const json = await google.customSearch({
      query: `"${parsedOrg.replaceAll(
        / /g,
        ""
      )}" AND "성명" AND "계엄" after:2024-12-03`,
    });

    await prisma.statementArticles.upsert({
      where: {
        groupName: org,
      },
      create: {
        groupName: org,
        articleCount: json.items?.length || 0,
        articles: json.items || [],
      },
      update: {
        articleCount: json.items?.length || 0,
        articles: json.items || [],
      },
    });
  }

  res.status(200).json({ success: true });
}
