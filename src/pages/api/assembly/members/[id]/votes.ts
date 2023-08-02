// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchVotingResultOnRegularSessionsByMembers } from "@/crawlers/assembly";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const age = req.query.age || "21";
  const monaCode: string = (req.query.monaCode as string) || "";

  const bills = await prisma.assemblyBill.findMany({
    where: {
      age: +age,
    },
  });

  for (const bill of bills) {
    const votes = await fetchVotingResultOnRegularSessionsByMembers({
      age: +age,
      billId: bill.id,
      monaCode,
    });

    for (const vote of votes) {
      const bonMeeting = await prisma.assemblyBonMeeting.findFirst({
        where: {
          term: vote.sessionTerm,
          number: vote.sessionNumber,
        },
      });

      const member = await prisma.assemblyMember.findFirst({
        where: {
          monaCode: vote.monaCode,
        },
      });

      console.log(
        "bon: ",
        bonMeeting?.id,
        "member: ",
        member?.id,
        "bill: ",
        bill.id,
        "vote: ",
        vote.voteResultCode
      );
    }
  }

  res.status(200).json({ bills });
}
