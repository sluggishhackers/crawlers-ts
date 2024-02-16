import * as https from "https";
import axios from "axios";
import { ServerSideNationalAssemblyMemberFromOpenWatch } from "@/models/assembly";

export const nationalAssemblyMembers = async ({
  age,
}: {
  age: number;
}): Promise<{
  rows: ServerSideNationalAssemblyMemberFromOpenWatch[];
}> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.get(
    `https://openwatch.kr/api/national-assembly/members?age=${age}&page=2&pageSize=100`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      httpsAgent,
    }
  );

  return result.data as {
    rows: ServerSideNationalAssemblyMemberFromOpenWatch[];
  };
};
