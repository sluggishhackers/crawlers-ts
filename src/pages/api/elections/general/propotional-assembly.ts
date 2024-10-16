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
   *        <select id="proportionalRepresentationCode" name="proportionalRepresentationCode" title="비례정당">
													<option value="-1">▽ 선 택</option>
													<option value="5076" selected="selected">더불어민주연합</option>
														<option value="5074">국민의미래</option>
														<option value="730">녹색정의당</option>
														<option value="5072">새로운미래</option>
														<option value="5070">개혁신당</option>
														<option value="3040">자유통일당</option>
														<option value="5077">조국혁신당</option>
														<option value="2070">가가국민참여신당</option>
														<option value="3010">가가호호공명선거대한당</option>
														<option value="1970">반공정당코리아</option>
														<option value="5054">가락특권폐지당</option>
														<option value="5051">공화당</option>
														<option value="5031">국가혁명당</option>
														<option value="2060">국민대통합당</option>
														<option value="5078">금융개혁당</option>
														<option value="2020">기독당</option>
														<option value="2080">기후민생당</option>
														<option value="5041">내일로미래로</option>
														<option value="1988">노동당</option>
														<option value="3000">노인복지당</option>
														<option value="5081">대중민주당</option>
														<option value="5059">대한국민당</option>
														<option value="650">대한민국당</option>
														<option value="5080">대한상공인당</option>
														<option value="4040">미래당</option>
														<option value="4070">새누리당</option>
														<option value="5079">소나무당</option>
														<option value="4080">신한반도당</option>
														<option value="5046">여성의당</option>
														<option value="5000">우리공화당</option>
														<option value="5056">자유민주당</option>
														<option value="5062">케이정치혁신연합당</option>
														<option value="5058">통일한국당</option>
														<option value="5066">한국농어민당</option>
														<option value="1990">한나라당</option>
														<option value="5055">한류연합당</option>
														<option value="4060">홍익당</option>
														<option value="5075">히시태그국민정책당</option>
														</select>
												
   */
  const parties: ServerSideGeneralElectionSido[] = [
    {
      CODE: 5076,
      NAME: "더불어민주연합",
    },
    {
      CODE: 5074,
      NAME: "국민의미래",
    },
    {
      CODE: 730,
      NAME: "녹색정의당",
    },
    {
      CODE: 5072,
      NAME: "새로운미래",
    },
    {
      CODE: 5070,
      NAME: "개혁신당",
    },
    {
      CODE: 3040,
      NAME: "자유통일당",
    },
    {
      CODE: 5077,
      NAME: "조국혁신당",
    },
    {
      CODE: 2070,
      NAME: "가가국민참여신당",
    },
    {
      CODE: 3010,
      NAME: "가가호호공명선거대한당",
    },
    {
      CODE: 1970,
      NAME: "반공정당코리아",
    },
    {
      CODE: 5054,
      NAME: "가락특권폐지당",
    },
    {
      CODE: 5051,
      NAME: "공화당",
    },
    {
      CODE: 5031,
      NAME: "국가혁명당",
    },
    {
      CODE: 2060,
      NAME: "국민대통합당",
    },
    {
      CODE: 5078,
      NAME: "금융개혁당",
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
      CODE: 5041,
      NAME: "내일로미래로",
    },
    {
      CODE: 1988,
      NAME: "노동당",
    },
    {
      CODE: 3000,
      NAME: "노인복지당",
    },
    {
      CODE: 5081,
      NAME: "대중민주당",
    },
    {
      CODE: 5059,
      NAME: "대한국민당",
    },
    {
      CODE: 650,
      NAME: "대한민국당",
    },
    {
      CODE: 5080,
      NAME: "대한상공인당",
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
      CODE: 5079,
      NAME: "소나무당",
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
      CODE: 5000,
      NAME: "우리공화당",
    },
    {
      CODE: 5056,
      NAME: "자유민주당",
    },
    {
      CODE: 5062,
      NAME: "케이정치혁신연합당",
    },
    {
      CODE: 5058,
      NAME: "통일한국당",
    },
    {
      CODE: 5066,
      NAME: "한국농어민당",
    },
    {
      CODE: 1990,
      NAME: "한나라당",
    },
    {
      CODE: 5055,
      NAME: "한류연합당",
    },
    {
      CODE: 4060,
      NAME: "홍익당",
    },
    {
      CODE: 5075,
      NAME: "히시태그국민정책당",
    },
  ];

  for (const party of parties) {
    const html = await fetch.generalElectionCandidates({
      electionCode: electionCode as fetch.GeneralElectionCode,
      statementId: `CPRI03_#${electionCode}`,
      proportionalRepresentationCode: `${party.CODE}`,
    });

    const candidates = parser.generalElectionCandidates(html, {
      propotional: true,
    });

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

      console.log(candidate.order, candidate.number);
      if (!existingCandidate) {
        console.log(candidate.name, "has created");
        await prisma.generalElectionCandidate.create({
          data: {
            ...candidate,
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
            careers: candidate.careers.join("\n"),
            educations: candidate.educations.join("\n"),
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
