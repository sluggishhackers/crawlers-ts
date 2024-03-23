// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GeneralElectionType, PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/nec";
import * as parser from "@/parsers/nec";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";
import { ServerSideGeneralElectionSido } from "@/models/election";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});
  const electionType = GeneralElectionType.PropotionalAssembly;

  await prisma.generalElectionCandidate.updateMany({
    where: {
      electionType,
    },
    data: {
      active: false,
    },
  });

  const electionCode = "7" as unknown;

  /**
 * 			<option value="730" selected="selected">녹색정의당</option>
            <option value="2070">가가국민참여신당</option>
            <option value="1970">반공정당코리아</option>
            <option value="5031">국가혁명당</option>
            <option value="2020">기독당</option>
            <option value="2080">기후민생당</option>
            <option value="4060">홍익당</option><option value="650">대한민국당</option>
            <option value="4040">미래당</option>
            <option value="4070">새누리당</option>
            <option value="4080">신한반도당</option>
            <option value="5046">여성의당</option>
            <option value="5066">한국농어민당</option>
            <option value="5055">한류연합당</option>
												
   */
  const parties: ServerSideGeneralElectionSido[] = [
    {
      CODE: 730,
      NAME: "녹색정의당",
    },
    {
      CODE: 2070,
      NAME: "가가국민참여신당",
    },
    {
      CODE: 1970,
      NAME: "반공정당코리아",
    },
    {
      CODE: 5031,
      NAME: "국가혁명당",
    },
    {
      CODE: 2020,
      NAME: "기독당",
    },
    {
      CODE: 2080,
      NAME: "기후민생당",
    },
    {
      CODE: 4060,
      NAME: "홍익당",
    },
    {
      CODE: 650,
      NAME: "대한민국당",
    },
    {
      CODE: 4040,
      NAME: "미래당",
    },
    {
      CODE: 4070,
      NAME: "새누리당",
    },
    {
      CODE: 4080,
      NAME: "신한반도당",
    },
    {
      CODE: 5046,
      NAME: "여성의당",
    },
    {
      CODE: 5066,
      NAME: "한국농어민당",
    },
    {
      CODE: 5055,
      NAME: "한류연합당",
    },
  ];
  for (const party of parties) {
    const html = await fetch.generalElectionCandidates({
      electionCode: electionCode as fetch.GeneralElectionCode,
      statementId: `CPRI03_#${electionCode}`,
      proportionalRepresentationCode: `${party.CODE}`,
    });

    const candidates = parser.generalElectionCandidates(html);

    for (const candidate of candidates) {
      console.log(candidate);
      const existingCandidate = await prisma.generalElectionCandidate.findFirst(
        {
          where: {
            electoralDistrict: candidate.electoralDistrict,
            name: candidate.name,
            photo: candidate.photo,
          },
        }
      );

      if (!existingCandidate) {
        console.log(candidate.name, "has created");
        await prisma.generalElectionCandidate.create({
          data: {
            ...candidate,
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

  sendMessage({
    text: "24년 비례대표 국회의원선거 후보자 업데이트를 완료하였습니다.",
    webhookUrl: CHANNEL_WEBHOOK.SLUGGISH_BOT_ELECTION24,
  });

  res.status(200).json({ success: true });
}
