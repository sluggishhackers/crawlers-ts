// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchMembers } from "@/crawlers/assembly";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page || 1;

  const members = await fetchMembers({
    page: +page,
    pageSize: 400,
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
          job: member.job,
          tel: member.tel,
          committee: member.committee,
          committees: member.committees?.join(",") || "",
          email: member.email,
          homepage: member.homepage,
          staff: member.staff?.join(",") || "",
          secretary: member.secretary?.join(",") || "",
          secretary2: member.secretary2?.join(",") || "",
          profile: member.profile?.join(",") || "",
          officeAddress: member.officeAddress || "",
        },
      });
    } else {
      await prisma.assemblyMember.update({
        where: {
          id: existingMember.id,
        },
        data: {
          electionDistrict: member.electionDistrict || "",
          electionDistrictType: member.electionDistrictType || "",
          job: member.job,
          tel: member.tel,
          committee: member.committee,
          committees: member.committees?.join(",") || "",
          email: member.email,
          homepage: member.homepage,
          staff: member.staff?.join(",") || "",
          secretary: member.secretary?.join(",") || "",
          secretary2: member.secretary2?.join(",") || "",
          profile: member.profile?.join(",") || "",
          officeAddress: member.officeAddress || "",
        },
      });
    }

    const age = 21;
    const existingMemberByAge = await prisma.assemblyMemberByAge.findFirst({
      where: {
        assemblyMemberId: existingMember.id,
        age,
      },
    });

    if (!existingMemberByAge) {
      await prisma.assemblyMemberByAge.create({
        data: {
          assemblyMemberId: existingMember.id,
          age,
        },
      });
    }
  }

  res.status(200).json({ members });
}
