import { reactionColors } from "..";

export async function getIdentifier(): Promise<string> {
  const rawIdentifierResponse = await fetch(
    "https://www.menti.com/core/identifiers",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-GB,en;q=0.5",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      referrer: "https://www.menti.com/",
      method: "POST",
      mode: "cors",
    }
  );

  const identifierResponse = await rawIdentifierResponse.json();

  return identifierResponse.identifier as string;
}

export async function getSeries(code: string): Promise<any> {
  // await fetch("https://www.menti.com/core/vote-ids/73788168/series", {
  //   credentials: "include",
  //   headers: {
  //     "User-Agent":
  //       "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
  //     Accept:
  //       "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  //     "Accept-Language": "en-GB,en;q=0.5",
  //     "Alt-Used": "www.menti.com",
  //     "Upgrade-Insecure-Requests": "1",
  //     "Sec-Fetch-Dest": "document",
  //     "Sec-Fetch-Mode": "navigate",
  //     "Sec-Fetch-Site": "none",
  //     "Sec-Fetch-User": "?1",
  //     Pragma: "no-cache",
  //     "Cache-Control": "no-cache",
  //   },
  //   method: "GET",
  //   mode: "cors",
  // });
  const response = await fetch(
    `https://www.menti.com/core/vote-ids/${code.replace(" ", "")}/series`,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.5",
        "Alt-Used": "www.menti.com",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      referrer: "https://www.menti.com/",
      method: "GET",
      mode: "cors",
    }
  );

  // console.log(await response.text());

  const readableResponse: any = await response.json();

  return readableResponse;
}

export async function sendReaction(
  voteKey: string,
  publicKey: string,
  reaction: string
) {
  const identifier = await getIdentifier();

  const reactionResponse = await fetch(
    `https://www.menti.com/core/audience/reactions/${publicKey}`,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
        Accept: "application/json",
        "Accept-Language": "en-GB,en;q=0.5",
        "Content-Type": "application/json",
        "X-Identifier": identifier,
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      referrer: `https://www.menti.com/${voteKey}`,
      body: `{"emoji":"${reaction}","color":"theme-fill-color-${Math.floor(
        Math.random() * reactionColors.length
      )}"}`,
      method: "POST",
      mode: "cors",
    }
  );
}

export async function votePoll(
  voteKey: string,
  publicKey: string,
  choice: number
) {
  const identifier = await getIdentifier();

  const votePollResponse = await fetch(
    `https://www.menti.com/core/votes/${publicKey}`,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
        Accept: "application/json",
        "Accept-Language": "en-GB,en;q=0.5",
        "Content-Type": "application/json",
        "X-Identifier": identifier,
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      referrer: `https://www.menti.com/${voteKey}`,
      body: `{"vote":"${choice}","type":"choices"}`,
      method: "POST",
      mode: "cors",
    }
  );
}

export async function sendToWordCloud(
  voteKey: string,
  publicKey: string,
  words: string[]
) {
  const identifier = await getIdentifier();
  var toSend = "";

  for (let index = 0; index < words.length; index++) {
    toSend = `${toSend} ${words[index].replace(" ", "_")}`;
  }
  await fetch(`https://www.menti.com/core/votes/${publicKey}`, {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
      Accept: "application/json",
      "Accept-Language": "en-GB,en;q=0.5",
      "Content-Type": "application/json",
      "X-Identifier": identifier,
      "Sec-GPC": "1",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    referrer: `https://www.menti.com/${voteKey}`,
    body: `{"vote":"${toSend}","type":"wordcloud"}`,
    method: "POST",
    mode: "cors",
  });
}
