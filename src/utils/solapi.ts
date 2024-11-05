import solapi from "solapi";

export const sendAlimtalk = ({
  apiKey,
  apiSecret,
  mobile,
  pfId,
  templateId,
  variables,
  from,
}: {
  apiKey: string;
  apiSecret: string;
  mobile: string;
  from: string;
  pfId: string;
  templateId: string;
  variables?: Record<string, string>;
}) => {
  const messageService = new solapi.SolapiMessageService(apiKey, apiSecret);

  return messageService.send({
    to: mobile,
    from,
    kakaoOptions: {
      pfId,
      templateId,
      // 치환문구가 없을 때의 기본 형태
      variables,
      disableSms: false,
    },
  });
};
