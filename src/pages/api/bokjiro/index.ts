// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import * as fetch from "@/clients/bokjiro";
import * as parser from "@/parsers/bokjiro";
import { sendMessage } from "@/utils/slack";
import { ServerSideServiceList } from "@/models/bokjiro";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});

  const initPage = 1;
  const pageSize = 9;

  const listResponse = await fetch.fetch({ page: initPage });
  const _result = listResponse.data as ServerSideServiceList;
  const totalPage = Math.ceil(_result.dmCount.dsServiceList0Count / pageSize);

  for (let i = 22; i <= totalPage; i++) {
    console.log("page: ", i);
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
        console.log("exisiting!");
        continue;
      }
      console.log("new! ");
      console.log(service.WLFARE_INFO_ID);

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
        text: `새로운 서비스가 등록되었습니다. ${createdService.id} - ${createdService.wlfareInfoNm} (${createdService.wlfareInfoReldBztpCdNm})\nlink: ${createdService.link}`,
        webhookUrl: process.env.SLACK_WEBHOOK_URL_BOKJIRO,
      });
    }
  }

  res.status(200).json({ success: true });
}
