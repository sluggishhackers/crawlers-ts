// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchOldMembers } from "@/crawlers/assembly";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page || 1;
  const age = req.query.age || "21";

  if (+age >= 22) {
    throw new Error("21대 이하 국회의원 인적사항만 가져올 수 있습니다.");
  }

  const members = await fetchOldMembers({
    page: +page,
    pageSize: 400,
    age: +age,
  });

  for (const member of members) {
    let existingMember = await prisma.assemblyMember.findFirst({
      where: {
        monaCode: member.monaCode,
      },
    });

    if (!existingMember) {
      existingMember = await prisma.assemblyMember.create({
        data: {
          monaCode: member.monaCode,
          name: member.name,
          nameHanja: member.nameHanja || "",
          nameEnglish: member.nameEnglish || "",
          birthdateType: member.birthdateType,
          birthdate: member.birthdate,
          gender: member.gender,
          reelected: member.reelected,
          partyName: member.partyName,
          electionDistrict: member.electionDistrict || "",
          electionDistrictType: member.electionDistrictType || "",
        },
      });
    } else {
      await prisma.assemblyMember.update({
        where: {
          id: existingMember.id,
        },
        data: {
          birthdate: member.birthdate,
        },
      });
    }

    const existingMemberByAge = await prisma.assemblyMemberByAge.findFirst({
      where: {
        assemblyMemberId: existingMember.id,
        age: +age,
      },
    });

    if (!existingMemberByAge) {
      await prisma.assemblyMemberByAge.create({
        data: {
          assemblyMemberId: existingMember.id,
          age: +age,
        },
      });
    }
  }

  res.status(200).json({ members });
}
