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
  const numReactions = await getNumberInRange(1, 100);
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
