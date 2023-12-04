import choices from "./question_types/choices";
import addReactions from "./question_types/reactions";
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
export var reactionColors: string[];

async function main() {
  const code = await readline.question("What's the menti code?            ");

  const readableResponse = await getSeries(code.replace(" ", ""));

  reactionColors = readableResponse.theme.bar_color;

  voteKey = readableResponse.vote_key;

  var question: any;

  if (
    (await readline.question(
      "Enter 'SELECT' to select a question, anything else to continue to current question:\n"
    )) == "SELECT"
  ) {
    console.log("\n\nAvailable questions:");
    printAvailableQuestions(readableResponse.questions);
    const questionNumber = await getQuestionInput(readableResponse.questions);

    question = readableResponse.questions[questionNumber];
  } else {
    const questions: any[] = readableResponse.questions;

    for (let index = 0; index < questions.length; index++) {
      const element = questions[index];
    }

    question = questions.find((question, index) => {
      if (question.id == readableResponse.pace.active) {
        return true;
      }
    });
  }

  const justAddReactions = await readline.question(
    "Enter 'REACT' to just skip to reacting, anything else to continue normally:\n"
  );

  switch (justAddReactions) {
    case "REACT":
      break;
    default:
      switch (question.type) {
        case "choices":
          await choices(question);
          break;
        case "wordcloud":
          await wordcloud(question);
          break;
        default:
          console.log(`Question type ${question.type} is not supported yet`);
          break;
      }
      break;
  }
  await addReactions(question);

  // const availableReactions = readableResponse.questions[0].reactions;
  // const publicKey = readableResponse.questions[0].public_key;
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
