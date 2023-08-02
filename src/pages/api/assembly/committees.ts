// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCommittees } from "@/crawlers/assembly";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const committees = await fetchCommittees({
    page: 1,
  });

  for (const committee of committees) {
    const existingCommittee = await prisma.assemblyCommittee.findFirst({
      where: {
        id: committee.id,
      },
    });

    if (!existingCommittee) {
      await prisma.assemblyCommittee.create({
        data: {
          id: committee.id,
          name: committee.name,
          chairperson: committee.chairperson,
          assistants: committee.assistants,
          limitAssistantsCount: +committee.limitAssistantsCount,
          currentCount: +committee.currentCount,
          nonNegotiationBodyCount: +committee.nonNegotiationBodyCount,
          negotiationBodyCount: +committee.negotiationBodyCount,
        },
      });
    }
  }

  res.status(200).json({ committees });
}
