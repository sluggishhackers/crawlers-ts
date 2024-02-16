// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { json2csv } from "json-2-csv";
import { nationalAssemblyMembers } from "@/clients/openwatch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rows: members } = await nationalAssemblyMembers({
    age: 21,
  });

  let splitedResult: any[] = [];
  members.forEach((member: any) => {
    const careers = member.careerAndEducation?.split(",") || [];
    const profiles = member.profile?.split(",") || [];

    const result: any[] = [];
    careers.forEach((career: string) => {
      result.push({
        ...member,
        profile: null,
        careerAndEducation: career,
      });
    });

    profiles.forEach((profile: string) => {
      result.push({
        ...member,
        profile,
        careerAndEducation: null,
      });
    });

    splitedResult = [...splitedResult, ...result];
  });

  const result = await json2csv(splitedResult as object[]);
  fs.writeFileSync("members.csv", result, "utf-8");

  res.status(200).json({ members });
}
