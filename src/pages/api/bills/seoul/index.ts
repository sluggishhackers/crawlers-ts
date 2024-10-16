// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Euian, PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/smc-seoul";
import * as parser from "@/parsers/smc-seoul";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});

  let currentPage = req.query.page ? +req.query.page : 1;
  let hasMorePage = true;

  while (hasMorePage) {
    console.log("current page: ", currentPage);
    const listResponse = await fetch.bills({ age: 11, page: currentPage });
    currentPage++;

    const rawBills = await parser.bills(listResponse);
    if (rawBills.length === 0) {
      hasMorePage = false;
    }

    const bills = await Promise.all(
      rawBills.map(async (_bill) => {
        const html = await fetch.bill({ link: _bill.link });
        return parser.bill(_bill, html);
      })
    );

    for (const bill of bills) {
      const data: any = {
        city: bill.city,
        link: bill["link"],
        files: bill["files"],
      };

      Object.keys(bill).forEach((key) => {
        switch (key) {
          case "번호": {
            data["number"] = bill[key];
            break;
          }
          case "대수": {
            data["age"] = bill[key];
            break;
          }
          case "의안명": {
            data["title"] = bill[key];
            break;
          }
          case "소관위원회": {
            data["committee"] = bill[key];
            break;
          }
          case "제안자": {
            data["proposer"] = bill[key];
            break;
          }
          case "제안일": {
            data["proposed_at"] = bill[key];
            break;
          }
          case "의안번호": {
            data["euian_number"] = bill[key];
            break;
          }
          case "의안종류": {
            data["euian_type"] = bill[key];
            break;
          }
          case "의안구분": {
            data["euian_class"] = bill[key];
            break;
          }
          case "발의구분": {
            data["euian_proposed_class"] = bill[key];
            break;
          }
          case "1인발의의원": {
            data["euian_proposer"] = bill[key];
            break;
          }
          case "공동발의의원": {
            data["euian_coproposer"] = bill[key];
            break;
          }
          case "소관위원회심사경과_회부일": {
            data["committee_reported_at"] = bill[key];
            break;
          }
          case "소관위원회심사경과_상정일": {
            data["committee_proposed_at"] = bill[key];
            break;
          }
          case "소관위원회심사경과_심사일": {
            data["committee_reviewed_at"] = bill[key];
            break;
          }
          case "소관위원회심사경과_처리결과": {
            data["committee_result"] = bill[key];
            break;
          }
          case "본회의심사경과_심사보고일": {
            data["plenary_reported_at"] = bill[key];
            break;
          }
          case "본회의심사경과_상정일": {
            data["plenary_proposed_at"] = bill[key];
            break;
          }
          case "본회의심사경과_의결일": {
            data["plenary_decided_at"] = bill[key];
            break;
          }
          case "본회의심사경과_처리결과": {
            data["plenary_result"] = bill[key];
            break;
          }
          case "본회의심사경과_처리결과_회의록링크": {
            data["plenary_result_discuss_link"] = bill[key];
            break;
          }
          case "제안요지": {
            data["summary"] = bill[key];
            break;
          }
          case "집행기관 이송일": {
            data["executive_agency_transferred_at"] = bill[key];
            break;
          }
          case "공포번호": {
            data["promulgation_number"] = bill[key];
            break;
          }
          case "공포일": {
            data["promulgation_date"] = bill[key];
            break;
          }
          case "철회/재의": {
            data["withdrawal_reconsideration"] = bill[key];
            break;
          }
          case "처리결과(진행사항)": {
            data["result"] = bill[key];
            break;
          }
          case "소개의원": {
            data["introducer"] = bill[key];
            break;
          }
        }
      });

      const existing = await prisma.euian.findFirst({
        where: {
          title: data.title,
          number: data.number,
          age: data.age,
          committee: data.committee,
        },
      });

      if (existing) {
        await prisma.euian.update({
          where: {
            id: existing.id,
          },
          data,
        });
      } else {
        await prisma.euian.create({ data });
      }
    }
  }

  res.status(200).json({ success: true });
}
