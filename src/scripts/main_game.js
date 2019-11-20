import getRandomQuestion from './game/getRandomQuestion.mjs';

const startButton = document.getElementById('startButton');
const answerText = document.getElementById('question');
const answersList = document.getElementById('answers');

startButton.addEventListener('click', async e => {
  let question = await getRandomQuestion();

  answerText.innerHTML = question.question;
  let answers = [question.correct_answer, ...question.incorrect_answers];
  answersList.innerHTML = '';
  for (let answer of answers) {
    let ansDiv = document.createElement('div');
    ansDiv.innerText = answer;
    answersList.appendChild(ansDiv);
  }
});
