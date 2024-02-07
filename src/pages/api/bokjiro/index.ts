// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/bokjiro";
import * as parser from "@/parsers/bokjiro";
import { CHANNEL_WEBHOOK, sendMessage } from "@/utils/slack";
import { ServerSideServiceList } from "@/models/bokjiro";

const makeMessage = ({
  wlfareInfoNm,
  link,
  BKJR_LFTM_CYC_CD,
}: {
  wlfareInfoNm: string;
  link: string;
  BKJR_LFTM_CYC_CD: string;
}) => {
  return `${wlfareInfoNm}, (${link}), (${BKJR_LFTM_CYC_CD})`;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});

  // const initPage = 1;
  // const pageSize = 9;

  // const listResponse = await fetch.fetch({ page: initPage });
  // const _result = listResponse.data as ServerSideServiceList;
  // const totalPage = Math.ceil(_result.dmCount.dsServiceList0Count / pageSize);

  for (let i = 1; i <= 100; i++) {
    const listResponse = await fetch.fetch({ page: i });
    const result = listResponse.data as ServerSideServiceList;
    const services = await parser.list(result);

    for (let j = 1; j < services.length; j++) {
      const service = services[j];

      const exisitingRow = await prisma.bokjiroService.findUnique({
        where: {
          id: service.WLFARE_INFO_ID,
        },
      });

      if (exisitingRow) {
        continue;
      }

      const detailResponse = await fetch.fetchDetail({
        wlfareInfoId: service.WLFARE_INFO_ID,
        wlfareInfoReldBztpCd: service.WLFARE_GDNC_TRGT_KCD,
      });

      const detail = parser.detail(detailResponse.data, {
        page: i,
        index: j,
        type: service.WLFARE_GDNC_TRGT_KCD,
      });

      const createdService = await prisma.bokjiroService.create({
        data: {
          ...detail.detail,
          CmmCd: detail.cmmCd,
          BKJR_LFTM_CYC_CD: detail.cmmCd.BKJR_LFTM_CYC_CD,
          WLFARE_INFO_AGGRP_CD: detail.cmmCd.WLFARE_INFO_AGGRP_CD,
        },
      });

      const _applyOrders =
        detail.applyOrders?.map((order) =>
          prisma.bokjiroServiceApplyOrder.create({
            data: {
              ...order,
              bokjiroServiceId: createdService.id,
            },
          })
        ) || [];

      await Promise.all(_applyOrders);

      sendMessage({
        text: makeMessage({
          wlfareInfoNm: createdService.wlfareInfoNm || "",
          link: createdService.link || "",
          BKJR_LFTM_CYC_CD: createdService.BKJR_LFTM_CYC_CD || "",
        }),
        webhookUrl: CHANNEL_WEBHOOK.SLUGGISH_BOT_BTOB,
      });
    }
  }

  res.status(200).json({ success: true });
}
