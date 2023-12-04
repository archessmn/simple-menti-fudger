import * as readline_lib from "readline/promises";
import { readline } from "..";

export async function getQuestionInput(questions: any[]) {
  var questionNumber = Number(
    await readline.question("Which one shall we answer:        ")
  );

  while (
    isNaN(questionNumber) ||
    questionNumber >= questions.length ||
    questionNumber < 0
  ) {
    questionNumber = Number(
      await readline.question("Idiot, enter one of the numbers:  ")
    );
  }

  return questionNumber;
}

export async function getChoicesInput(choices: any[]) {
  var choiceNumber = Number(
    await readline.question("Which one are we picking:         ")
  );

  while (
    isNaN(choiceNumber) ||
    !choices.map((choice) => choice.id).includes(choiceNumber)
  ) {
    var choiceNumber = Number(
      await readline.question("You blind? Pick one from above:   ")
    );
  }

  return choices.find((choice) => choice.id == choiceNumber);
}

export async function getReactionsInput(reactions: string[]) {
  var reactionNumber = Number(
    await readline.question("Which one shall we send:          ")
  );

  while (
    isNaN(reactionNumber) ||
    reactionNumber >= reactions.length ||
    reactionNumber < 0
  ) {
    reactionNumber = Number(
      await readline.question("Really? The numbers are right there:  ")
    );
  }

  return reactionNumber;
}

export async function getNumberInRange(
  lower: number,
  upper: number
): Promise<number> {
  var numberInput = Number(
    await readline.question(
      `Pick a number between ${lower} and ${upper} inclusive:   `
    )
  );

  while (isNaN(numberInput) || numberInput < lower || numberInput > upper) {
    var numberInput = Number(
      await readline.question(`Let's try that again shall we?:   `)
    );
  }

  return numberInput;
}
