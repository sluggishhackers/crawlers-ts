import type { NextApiRequest, NextApiResponse } from "next";

import { send } from "@/utils/email";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await send({
    sender: "hoonyland.newsletter@gmail.com",
    receiver: "hoonyland.newsletter@gmail.com",
    subject: "test",
    body: "test",
  });
  console.log(result);

  res.status(200).json({ success: true });
}
