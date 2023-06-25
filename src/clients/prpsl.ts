import * as https from "https";
import axios from "axios";
import { Prpsl } from "@/models/prpsl";

type QueryParams = {
  prpsl_type_cd: string;
  gubun_cd: string;
  schQuery: string;
  subjt_div_cd: string;
  confr_grp_nm: string;
  targetRow: string;
  link_mini_cd: string;
  row_count: string;
  subjt_seq: string;
  subjt_no: string;
  s_text: string;
  sch_type: string;
  prpsl_type_seq: string;
};

export const fetch = async ({
  page,
}: {
  page: number;
}): Promise<{ data: Prpsl[]; query: QueryParams }> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const _page = page - 1 ? `${page - 1}` : "";

  const result = await axios.post(
    `https://www.better.go.kr/rz.task.TaskSlPLAjax.laf`,
    {
      prpsl_type_seq: "1575",
      gubun_cd: "19",
      link_mini_cd: "1613000",
      sch_type: "01",
      targetRow: `${_page}1`,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      httpsAgent,
    }
  );

  const _result = result.data as { "0": Prpsl[]; "2": QueryParams };
  return {
    data: _result[0].map((prpsl) => {
      prpsl.subjt_seq = prpsl.subjt_seq || null;
      prpsl.prpsl_type_seq = prpsl.prpsl_type_seq || null;
      prpsl.prpsl_seq = prpsl.prpsl_seq || null;
      return prpsl;
    }),
    query: _result[2],
  };
};

export const fetchDetail = async ({
  gubun_cd,
  subjt_no,
  subjt_seq,
  prpsl_type_seq,
}: // targetRow,
// prpsl_type_seq,
{
  gubun_cd: string;
  subjt_no: string;
  subjt_seq: number | null;
  prpsl_type_seq: number | null;
  // targetRow: string;
  // prpsl_type_seq: string;
}): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const url = `https://www.better.go.kr/rz.task.TaskAllSl.laf?&subjt_seq=${
    subjt_seq || ""
  }&prpsl_type_cd=&prpsl_type_seq=${prpsl_type_seq || ""}&subjt_no=${
    subjt_no || ""
  }&subjt_div_cd=&gubun_cd=${gubun_cd}&link_mini_cd=1613000&targetRow=&confr_grp_nm=&sch_type=01&s_text=`;

  const result = await axios.get(url, {
    httpsAgent,
  });

  return result.data;
};
