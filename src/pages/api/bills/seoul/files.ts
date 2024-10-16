import fs from "fs";
import axios from "axios";
import { homedir } from "os";

import { Euian, PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});

  const rows = await prisma.euian.findMany({
    where: {
      city: "seoul",
    },
    orderBy: {
      number: "asc",
    },
  });

  let i = 0;
  for (const row of rows) {
    i++;

    const files = (row.files || []) as { downloadLink: string; name: string }[];
    for (const file of files) {
      let path = `${homedir()}/euian-files-seoul/${row.age}-${
        row.number
      }-${row.title?.replaceAll(" ", "_")}-${file.name.replaceAll(
        /[ \(\)\[\]\/]/g,
        "_"
      )}`;

      const fileTypeRegex = /.*fileName=.*\.(.+)&/;
      const fileTypeResult = fileTypeRegex.exec(file.downloadLink);
      if (fileTypeResult) {
        path = `${path}.${fileTypeResult[1].toLocaleLowerCase()}`;
      }

      path = path
        .replace(/[\(\)]/g, "_")
        .replace(/[·ㆍ]/g, "_")
        .replace(/[｢｣]/g, "_")
        .replace(/[「」]/g, "_")
        .replace(/[\[\]]/g, "_")
        .replace(/ /g, "_")
        .replace(/[_]{2,}/g, "_")
        .replace(".pdf.pdf", ".pdf")
        .replace(".hwp.hwp", ".hwp")
        .replace(".hwpx.hwpx", ".hwpx");

      const response = await axios.get(
        `https://www.smc.seoul.kr${file.downloadLink}`,
        {
          responseType: "arraybuffer",
        }
      );

      fs.writeFileSync(path, response.data);
      console.log(path, "has downloaded");
    }
  }

  console.log(rows.length);

  res.status(200).json({ success: true });
}
