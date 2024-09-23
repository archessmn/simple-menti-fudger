import { readline, voteKey } from "..";
import { getNumberInRange } from "../utils/inputs";
import { sendToWordCloud } from "../utils/requests";
import sleep from "../utils/sleep";

export default async function wordcloud(question: any) {
  var wordsToSend: string[] = [];

  for (let index = 0; index < 3; index++) {
    const newWord = await readline.question(
      "Enter a word to send to wordcloud:   "
    );
    wordsToSend.push(newWord);
  }

  console.log(`How many times do you want to answer?`);
  const numberOfAnswers = await getNumberInRange(1, 10);

  for (let index = 0; index < numberOfAnswers; index++) {
    await sleep(Math.random() * 2250 + 250);
    sendToWordCloud(voteKey, question.public_key, wordsToSend);
  }
}
