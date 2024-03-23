// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GeneralElectionType, PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/nec";
import * as parser from "@/parsers/nec";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});
  const electionType = GeneralElectionType.GusigunAssembly;

  await prisma.generalElectionCandidate.updateMany({
    where: {
      electionType,
    },
    data: {
      active: false,
    },
  });

  const electionCode = "6" as unknown;
  const sidos = await fetch.generalElectionSidos({
    electionCode: electionCode as fetch.GeneralElectionCode,
  });

  for (const sido of sidos) {
    const electoralDistricts = await fetch.generalElectionElectoralDistricts({
      cityCode: `${sido.CODE}`,
      electionCode: electionCode as fetch.GeneralElectionCode,
    });

    for (const electoralDistrict of electoralDistricts) {
      const html = await fetch.generalElectionCandidates({
        cityCode: `${sido.CODE}`,
        electionCode: electionCode as fetch.GeneralElectionCode,
        electoralDistrictCode: `${electoralDistrict.CODE}`,
        statementId: `CPRI03_#${electionCode}`,
        townCode: `${electoralDistrict.CODE}`,
      });

      const candidates = parser.generalElectionCandidates(html);

      for (const candidate of candidates) {
        if (!candidate.name) {
          continue;
        }

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
              criminalRecord: candidate.criminalRecord,
              property: candidate.property,
              militaryEnrollment: candidate.militaryEnrollment,
              taxPayment: candidate.taxPayment,
              taxEvasionForLastFiveYears: candidate.taxEvasionForLastFiveYears,
              taxEvasionForNow: candidate.taxEvasionForNow,
              numberOfCandidacies: candidate.numberOfCandidacies,
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
              criminalRecord: candidate.criminalRecord,
              property: candidate.property,
              militaryEnrollment: candidate.militaryEnrollment,
              taxPayment: candidate.taxPayment,
              taxEvasionForLastFiveYears: candidate.taxEvasionForLastFiveYears,
              taxEvasionForNow: candidate.taxEvasionForNow,
              numberOfCandidacies: candidate.numberOfCandidacies,
              electionType,
              active: true,
            },
          });
        }
      }
    }
  }

  sendMessage({
    text: "24년 구시군의회의원 후보자 업데이트를 완료하였습니다.",
    webhookUrl: CHANNEL_WEBHOOK.SLUGGISH_BOT_ELECTION24,
  });

  res.status(200).json({ success: true });
}
