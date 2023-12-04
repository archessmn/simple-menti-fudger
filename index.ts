const numReactions = 300;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

readline.question("What's the menti code?  ", async (code: string) => {
  const identifier = await getIdentifier();

  const response = await fetch(
    `https://www.menti.com/core/vote-ids/${code.replace(" ", "")}/series`,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0",
        Accept: "application/json",
        "Accept-Language": "en-GB,en;q=0.5",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      referrer: "https://www.menti.com/",
      method: "GET",
      mode: "cors",
    }
  );

  const readableResponse: any = await response.json();

  // console.log(readableResponse);

  const voteKey = readableResponse.vote_key;

  // console.log(voteKey);

  const availableReactions = readableResponse.questions[0].reactions;
  const publicKey = readableResponse.questions[0].public_key;

  console.log("Available reactions:");
  printAvailableReactions(availableReactions);
  console.log("However, I shall spam them all...");

  for (let r = 0; r < availableReactions.length; r++) {
    const reaction = availableReactions[r];

    for (let index = 0; index < numReactions; index++) {
      sendReaction(voteKey, publicKey, reaction);
    }

    await sleep(1000);
  }

  readline.close();
});

function printAvailableReactions(reactions: string[]) {
  for (let r = 0; r < reactions.length; r++) {
    const reaction = reactions[r];
    console.log(`${r} - ${reaction}`);
  }
}

async function sendReaction(
  voteKey: string,
  publicKey: string,
  reaction: string
) {
  const identifier = await getIdentifier();

  const reactionResponse = await fetch(
    "https://www.menti.com/core/audience/reactions/mkdys9nrsq18",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0",
        Accept: "application/json",
        "Accept-Language": "en-GB,en;q=0.5",
        "Content-Type": "application/json",
        "X-Identifier": identifier,
        "sentry-trace": "4b93b1f95ab645b8a482aa70e46f3bda-b2d1131a9d4626d7-0",
        baggage:
          "sentry-environment=prod,sentry-release=b2436f936648205ae2920a97e76effe5bd3b5d3d,sentry-public_key=acefa0c4155042c7a28a0fae734bb32d,sentry-trace_id=4b93b1f95ab645b8a482aa70e46f3bda",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      referrer: `https://www.menti.com/${voteKey}`,
      body: `{"emoji":"${reaction}","color":"theme-fill-color-1"}`,
      method: "POST",
      mode: "cors",
    }
  );
}

async function getIdentifier(): Promise<string> {
  const rawIdentifierResponse = await fetch(
    "https://www.menti.com/core/identifiers",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0",
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
