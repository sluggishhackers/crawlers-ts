import { fetch as fetchSeoulCouncilMinutes } from "@/clients/seoul-council-minutes";
import { seoulCouncilMinutes } from "@/parsers/council-minutes";
import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetchSeoulCouncilMinutes();
  const result = await seoulCouncilMinutes(response.data);
  const existingCouncilMinutes = await prisma.councilMinute.findFirst({
    where: result,
  });

  if (!existingCouncilMinutes) {
    const councilMinute = await prisma.councilMinute.create({
      data: result,
    });

    return res.status(200).json(councilMinute);
  }

  return res.status(200).json(existingCouncilMinutes);
}
