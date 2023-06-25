import mailgun from "mailgun-js";

export const send = ({
  sender,
  receiver,
  subject,
  body,
}: {
  sender: string;
  receiver: string;
  subject: string;
  body: string;
}) => {
  const mg = mailgun({
    apiKey: "1dcae9f07c60e44c082111af5669f9ab-70c38fed-e347c0b7",
    domain: "sandbox3a005da63eda4102a53a544628a4fab3.mailgun.org",
  });
  const data = {
    from: sender,
    to: receiver,
    subject: subject,
    text: body,
  };

  return new Promise((resolve, reject) => {
    mg.messages().send(data, (error, _body) => {
      if (error) {
        reject(error);
      }
      resolve(_body);
    });
  });
};
