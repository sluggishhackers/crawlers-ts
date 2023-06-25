import axios from "axios";
import * as https from "https";

const createAuthenticatedClient = ({
  url,
  userInfo,
}: {
  url: string;
  userInfo: {
    username: [string, string];
    password: [string, string];
  };
}) => {
  return axios.post(
    url,
    {
      [userInfo.username[0]]: userInfo.username[1],
      [userInfo.password[0]]: userInfo.password[1],
    },
    {
      withCredentials: true,
    }
  );
};

export default createAuthenticatedClient;
