// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBonMeetings } from "@/crawlers/assembly";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page || 1;
  const age = req.query.age || "21";

  const meetings = await fetchBonMeetings({
    page: +page,
    age: +age,
  });

  for (const meeting of meetings) {
    let existingMeeting = await prisma.assemblyBonMeeting.findFirst({
      where: {
        id: meeting.id,
      },
    });

    if (!existingMeeting) {
      await prisma.assemblyBonMeeting.create({
        data: {
          ...meeting,
        },
      });
    }
  }

  res.status(200).json({ meetings });
}
