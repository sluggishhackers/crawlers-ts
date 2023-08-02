// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchVotingResultOnRegularSessionsByMembers } from "@/crawlers/assembly";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const age = req.query.age || "21";

  const bills = await prisma.assemblyBill.findMany({
    where: {
      age: +age,
    },
  });

  //   for (const member of members) {
  for (const bill of bills) {
    const votes = await fetchVotingResultOnRegularSessionsByMembers({
      age: +age,
      billId: bill.id,
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

      if (bonMeeting && member) {
        const assemblyVoteByBill = await prisma.assemblyVoteByBill.findFirst({
          where: {
            billId: bill.id,
            bonMeetingId: bonMeeting?.id,
            memberId: member?.id,
          },
        });

        if (!assemblyVoteByBill) {
          await prisma.assemblyVoteByBill.create({
            data: {
              billId: bill.id,
              bonMeetingId: bonMeeting.id,
              memberId: member.id,
              committeeId: vote.committeeId,
              voteDate: vote.voteDate,
              voteResultCode: vote.voteResultCode,
              age: vote.age,
            },
          });
        }
      }
    }
  }
  //   }

  res.status(200).json({ bills });
}
