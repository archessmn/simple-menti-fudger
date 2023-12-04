import { readline, voteKey } from "..";
import { getChoicesInput, getNumberInRange } from "../utils/inputs";
import { votePoll } from "../utils/requests";
import sleep from "../utils/sleep";

export default async function choices(question: any) {
  console.log(`\n\n\nWelcome to question \`${question.question}\`\n`);

  printChoices(question.choices);

  const choice = await getChoicesInput(question.choices);

  console.log(`How many times do you want to answer ${choice.label}?`);
  const numberOfAnswers = await getNumberInRange(1, 50);

  for (let index = 0; index < numberOfAnswers; index++) {
    await sleep(Math.random() * 3500 + 500);
    votePoll(voteKey, question.public_key, choice.id);
  }
}

function printChoices(choices: any[]) {
  for (let c = 0; c < choices.length; c++) {
    console.log(`${choices[c].id} - ${choices[c].label}`);
  }
}
