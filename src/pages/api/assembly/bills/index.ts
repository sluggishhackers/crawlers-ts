// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAssemblyBills } from "@/crawlers/assembly";
import { AssemblyBill } from "@/models/assembly";

async function findOrCreateBills(bills: AssemblyBill[]) {
  for (const bill of bills) {
    let existingCommittee = await prisma.assemblyCommittee.findFirst({
      where: {
        id: bill.committeeId,
      },
    });

    if (!existingCommittee) {
      existingCommittee = await prisma.assemblyCommittee.create({
        data: {
          id: bill.committeeId,
          name: bill.committee,
        },
      });
    }

    let existingBill = await prisma.assemblyBill.findFirst({
      where: {
        id: bill.id,
      },
    });

    if (!existingBill) {
      await prisma.assemblyBill.create({
        data: {
          id: bill.id,
          age: bill.age,
          no: bill.no,
          name: bill.name,
          kind: bill.kind,
          proposer: bill.proposer,
          voteResult: bill.voteResult,
          voteCountTotal: bill.voteCountTotal,
          voteCountYes: bill.voteCountYes,
          voteCountNo: bill.voteCountNo,
          voteCountAbstain: bill.voteCountAbstain,
          proposedDate: bill.proposedDate,
          committeeSubmitDate: bill.committeeSubmitDate,
          committeePresentDate: bill.committeePresentDate,
          committeeVoteDate: bill.committeeVoteDate,
          lawSubmitDate: bill.lawSubmitDate,
          lawPresentDate: bill.lawPresentDate,
          lawVoteDate: bill.lawVoteDate,
          regularSessionPresentDate: bill.regularSessionPresentDate,
          regularSessionVoteDate: bill.regularSessionVoteDate || bill.voteDate,
          govTransferedDate: bill.govTransferedDate,
          announceDate: bill.announceDate,
          link: bill.link,
          committeeId: existingCommittee!.id,
        },
      });
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const page = req.query.page || 1;

  for (let i = 1; i <= 500; i++) {
    console.log("page: ", i);
    const bills = await fetchAssemblyBills({
      page: i,
      pageSize: 300,
    });

    await findOrCreateBills(bills);
  }

  res.status(200).json({ success: true });
}
