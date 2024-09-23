import { voteKey } from "..";
import { getNumberInRange, getReactionsInput } from "../utils/inputs";
import { sendReaction } from "../utils/requests";
import sleep from "../utils/sleep";

export default async function addReactions(question: any) {
  const availableReactions = question.reactions;

  const publicKey = question.public_key;

  console.log("\n\nAvailable reactions:");
  printAvailableReactions(availableReactions);
  const reactionNumber = await getReactionsInput(availableReactions);
  const reaction = availableReactions[reactionNumber];

  console.log("\nHow many reactions to send?");
  const numReactions = await getNumberInRange(1, 100, true);
  for (let index = 0; index < numReactions; index++) {
    await sleep(Math.random() * 200 + 50);
    sendReaction(voteKey, publicKey, reaction);
  }
}

function printAvailableReactions(reactions: string[]) {
  for (let r = 0; r < reactions.length; r++) {
    const reaction = reactions[r];
    console.log(`${r} - ${reaction}`);
  }
}

async function like() {
  for (var i = 0; i < 5; i++) {
    await sleep(500);
    await fetch(
      "https://www.menti.com/core/audience/reactions/ikubq8hmtyex/publish",
      {
        credentials: "include",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
          Accept: "application/json",
          "Accept-Language": "en-GB,en;q=0.5",
          "Content-Type": "application/json",
          "X-Identifier":
            "alz68892qbaf5cov2y3ey47hmwr4xstof2ajia38rpq18j79tratf8w3567754c3",
          "sentry-trace": "ac052fe0dcb04a0c9bc59b724ed9f4e5-a4c55b717cddbe22-0",
          baggage:
            "sentry-environment=prod,sentry-release=3a1c5b23a76868182d6ff7f2540d3d2ed9da7209,sentry-public_key=acefa0c4155042c7a28a0fae734bb32d,sentry-trace_id=ac052fe0dcb04a0c9bc59b724ed9f4e5",
          "Alt-Used": "www.menti.com",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
        referrer: "https://www.menti.com/aljdis1ehr2u",
        body: `{\"emoji\":\"thumbsup\",\"color\":\"theme-fill-color-${i}\",\"vote_key\":\"aljdis1ehr2u\",\"amount\":10}`,
        method: "POST",
        mode: "cors",
      }
    );
  }
}
