import qs from "qs";
import * as https from "https";
import axios from "axios";

export const login = async ({
  name,
  birth,
  joinType,
  password,
}: {
  name: string;
  birth: string;
  joinType?: string;
  password: string;
}): Promise<unknown> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const result = await axios.post(
    `https://www.kocsc.or.kr/main/cop/cpl/digitalCrimeReportInsertView.do`,
    {
      login1: name,
      login2: birth,
      joinType: joinType || "24",
      password,
      password_hint: "1",
      password_answer: "",
      change_password: "",
      change_password2: "",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      httpsAgent,
    }
  );

  return result.data;
};
