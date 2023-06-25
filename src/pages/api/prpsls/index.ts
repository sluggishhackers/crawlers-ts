// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/prpsl";
import * as parser from "@/parsers/prpsl";
import { sendMessage } from "@/utils/slack";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  let page = 3;
  let hasMore = true;

  while (hasMore) {
    const result = await fetch.fetch({ page });

    console.log(`page: ${page}, result: ${result.data.length}`);

    if (result.data.length) {
      for (const _prpsl of result.data) {
        const html = await fetch.fetchDetail({
          gubun_cd: _prpsl.div_cd,
          subjt_no: _prpsl.subjt_no,
          subjt_seq: _prpsl.subjt_seq,
          prpsl_type_seq: _prpsl.prpsl_type_seq,
        });
        const prpsl = parser.prpsl(html);
        console.log("title: ", prpsl.title);

        const dbRow = await prisma.prpsl.findFirst({
          where: {
            title: prpsl.title,
            prpsl_seq: _prpsl.prpsl_seq,
            prpsl_type_seq: _prpsl.prpsl_type_seq,
            subjt_seq: _prpsl.subjt_seq,
            subjt_no: _prpsl.subjt_no,
          },
        });

        if (dbRow) {
          console.log(
            `updated prpsl: ${_prpsl.subjt_seq} ${_prpsl.subjt_no}: ${prpsl.title}`
          );
          //   if (dbRow.law_status !== _prpsl.law_status) {
          prisma.prpsl.update({
            where: {
              id: dbRow.id,
            },
            data: {
              ..._prpsl,
              ...prpsl,
            },
          });
          //   }
        } else {
          console.log(`new prpsl: ${_prpsl.subjt_no}: ${prpsl.title}`);
          await prisma.prpsl.create({
            data: {
              ..._prpsl,
              ...prpsl,
            },
          });
        }
      }

      page++;
    } else {
      hasMore = false;
    }
  }

  res.status(200).json({ success: true });
}
