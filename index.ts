import fetch from "node-fetch";

export type Response = {
  status?: number;
  statusText?: string;
  errorCode?: string;
};

export interface WebhooksSendMessage {
  // jandi인지 slack인지 여부
  type: "jandi" | "slack";

  // webhooks의 url을 입력
  urlType: string[];

  // 응답에 대한 제목
  title: string;

  // 응답에 대한 내용
  content: string;

  // 응답에 대한 callbakc으로 필요한지 여부
  callback?: (res: Response) => {};
}

export const webhooksSendMessage = async ({
  type,
  urlType,
  title,
  content,
  callback,
}: WebhooksSendMessage) => {
  const isJandi = type === "jandi";
  const url: string[] = urlType;
  const urlLength: number = url.length;

  let headers: { "Content-type": string; Accept?: string } = {
    "Content-type": "application/json",
  };

  let payload: string = "";

  if (isJandi) {
    headers = {
      ...headers,
      ...{ Accept: "application/vnd.tosslab.jandi-v2+json" },
    };

    payload = JSON.stringify({
      body: title,
      connectColor: "#00C473",
      connectInfo: [{ description: content }],
    });
  } else {
    payload = JSON.stringify({
      text: title,
      attachments: [
        {
          text: content,
          fallback: "You are unable to choose a game",
          callback_id: "wopr_game",
          color: "#3AA3E3",
          attachment_type: "default",
        },
      ],
    });
  }

  for (let i = 0; i < urlLength; i++) {
    await fetch(url[i], {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers,
      body: payload,
    })
      .then((res) => {
        callback && callback(res);
      })
      .catch((error) => {
        callback && callback(error);
      });
  }
};
