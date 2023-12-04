import choices from "./question_types/choices";
import wordcloud from "./question_types/wordcloud";
import { getQuestionInput } from "./utils/inputs";
import {
  getIdentifier,
  getSeries,
  sendReaction,
  votePoll,
} from "./utils/requests";
import sleep from "./utils/sleep";

var numReactions = 1;

import * as readline_lib from "readline/promises";

export const readline = readline_lib.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export var voteKey: string;

async function main() {
  const code = await readline.question("What's the menti code?            ");

  const readableResponse = await getSeries(code.replace(" ", ""));
  voteKey = readableResponse.vote_key;

  console.log("\n\nAvailable questions:");
  printAvailableQuestions(readableResponse.questions);

  var questionNumber = await getQuestionInput(readableResponse.questions);

  const question = readableResponse.questions[questionNumber];

  switch (question.type) {
    case "choices":
      await choices(question);
      break;
    case "wordcloud":
      await wordcloud(question);
    default:
      console.log(`Question type ${question.type} is not supported yet`);
      break;
  }

  const availableReactions = readableResponse.questions[0].reactions;
  const publicKey = readableResponse.questions[0].public_key;

  // for (let a = 0; a < 10; a++) {
  //   votePoll(voteKey, publicKey, 1);
  // }

  // console.log("\n\nAvailable reactions:");
  // printAvailableReactions(availableReactions);

  // for (let r = 0; r < availableReactions.length; r++) {
  //   const reaction = availableReactions[r];

  //   for (let index = 0; index < numReactions; index++) {
  //     sendReaction(voteKey, publicKey, reaction);
  //   }

  //   await sleep(1000);
  // }
  // process.exit();
}

function printAvailableReactions(reactions: string[]) {
  for (let r = 0; r < reactions.length; r++) {
    const reaction = reactions[r];
    console.log(`${r} - ${reaction}`);
  }
}

function printAvailableQuestions(questions: any[]) {
  for (let q = 0; q < questions.length; q++) {
    const question = questions[q];
    console.log(`${q} - ${question.question}`);
  }
}

main();
