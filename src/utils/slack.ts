import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendMessage = ({
  text,
  webhookUrl,
}: {
  text: string;
  webhookUrl?: string;
}) => {
  return axios.post(webhookUrl || (process.env.SLACK_WEBHOOK_URL as string), {
    text,
  });
};
