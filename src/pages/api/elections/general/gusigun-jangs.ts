// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GeneralElectionType, PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/nec";
import * as parser from "@/parsers/nec";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});
  const electionType = GeneralElectionType.GusigunJang;

  await prisma.generalElectionCandidate.updateMany({
    where: {
      electionType,
    },
    data: {
      active: false,
    },
  });

  const electionCode = "4" as unknown;
  const sidos = await fetch.generalElectionSidos({
    electionCode: electionCode as fetch.GeneralElectionCode,
  });

  for (const sido of sidos) {
    const electoralDistricts = await fetch.generalElectionSigungus({
      cityCode: `${sido.CODE}`,
      electionCode: electionCode as fetch.GeneralElectionCode,
    });

    for (const electoralDistrict of electoralDistricts) {
      const html = await fetch.generalElectionCandidates({
        cityCode: `${sido.CODE}`,
        electionCode: electionCode as fetch.GeneralElectionCode,
        electoralDistrictCode: `${electoralDistrict.CODE}`,
        statementId: `PCRI03_#${electionCode}`,
      });

      const candidates = parser.generalElectionCandidates(html);

      for (const candidate of candidates) {
        const existingCandidate =
          await prisma.generalElectionCandidate.findFirst({
            where: {
              electoralDistrict: candidate.electoralDistrict,
              name: candidate.name,
              photo: candidate.photo,
            },
          });

        if (!existingCandidate) {
          console.log(candidate.name, "has created");
          await prisma.generalElectionCandidate.create({
            data: {
              ...candidate,
              sido: sido.NAME,
              sidoCode: +sido.CODE,
              electoralDistrictCode: +electoralDistrict.CODE,
              careers: candidate.careers.join("\n"),
              educations: candidate.educations.join("\n"),
              electionType,
              active: true,
            },
          });
        } else {
          console.log(candidate.name, "has updated");
          await prisma.generalElectionCandidate.update({
            where: {
              id: existingCandidate.id,
            },
            data: {
              ...candidate,
              sido: sido.NAME,
              sidoCode: +sido.CODE,
              electoralDistrictCode: +electoralDistrict.CODE,
              careers: candidate.careers.join("\n"),
              educations: candidate.educations.join("\n"),
              electionType,
              active: true,
            },
          });
        }
      }
    }
  }

  res.status(200).json({ success: true });
}