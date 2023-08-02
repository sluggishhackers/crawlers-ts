// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { fetchOldMembersFromHJ } from "@/crawlers/assembly";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page || 1;
  const age = req.query.age || "21";

  const members = await fetchOldMembersFromHJ({
    page: +page,
    pageSize: 400,
    age: +age,
  });

  for (const member of members) {
    const existingMember = await prisma.assemblyMemberFromHJ.findFirst({
      where: {
        hjId: +member.id,
        age: +age,
      },
    });

    if (!existingMember) {
      await prisma.assemblyMemberFromHJ.create({
        data: {
          hjId: +member.id,
          age: +age,
          name: member.name,
          religionAndHobby: member.religionAndHobby.join(","),
          careerAndEducation: member.careerAndEducation.join(","),
          partiesByAge: member.partiesByAge.join(","),
          books: member.books.join(","),
        },
      });
    } else {
      await prisma.assemblyMemberFromHJ.update({
        where: {
          id: existingMember.id,
        },
        data: {
          birth: member.birthDate,
        },
      });
    }
  }

  console.log("done!");

  res.status(200).json({ members });
}
