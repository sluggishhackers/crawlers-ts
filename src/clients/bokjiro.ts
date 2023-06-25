import axios from "axios";
import * as https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const fetch = ({ page }: { page: number }) => {
  return axios.post(
    "https://www.bokjiro.go.kr/ssis-tbu/TWAT52005M/twataa/wlfareInfo/selectWlfareInfo.do",
    {
      dmScr: {
        curScrId: "tbu/app/twat/twata/twataa/TWAT52005M",
        befScrId: "",
      },
      dmSearchParam: {
        tabId: "1",
        orderBy: "date",
        page,
        favoriteKeyword: "Y",
        searchTerm: "",
        jjim: "",
      },
    },
    {
      httpsAgent,
    }
  );
};

export const fetchDetail = ({
  wlfareInfoId,
  wlfareInfoReldBztpCd,
}: {
  wlfareInfoId: string;
  wlfareInfoReldBztpCd: "01" | "02" | "03";
}) => {
  let url = "moveTWAT52011M.do";
  switch (wlfareInfoReldBztpCd) {
    case "02": {
      url = "moveTWAT52011M.do";
      break;
    }
    case "03": {
      url = "moveTWAT52015M.do";
      break;
    }
  }

  return axios.get(
    `https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/${url}?wlfareInfoId=${wlfareInfoId}&wlfareInfoReldBztpCd=${wlfareInfoReldBztpCd}`,
    {
      httpsAgent,
    }
  );
};
