import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const CHANNEL_WEBHOOK = {
  SLUGGISH_BOT_OGK: process.env.SLACK_WEBHOOK_URL_SLUGGISH_OGK,
  SLUGGISH_BOT_BTOB: process.env.SLACK_WEBHOOK_URL_SLUGGISH_BTOB,
  SLUGGISH_BOT_PHARMACIST: process.env.SLACK_WEBHOOK_URL_SLUGGISH_PHARMACIST,
  SLUGGISH_BOT_PEOPLEPOWER: process.env.SLACK_WEBHOOK_URL_SLUGGISH_PEOPLEPOWER,
  SLUGGISH_BOT_ELECTION24: process.env.SLACK_WEBHOOK_URL_SLUGGISH_ELECTION24,
};

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
