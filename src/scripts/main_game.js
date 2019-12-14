import getRandomQuestion from './game/getRandomQuestion.mjs';
import gameState from './game/gameState.mjs';

const answerText = document.getElementById('question');
const answersList = document.getElementById('answers');
const currentStreak = document.getElementById('current-streak');
const maxStreak = document.getElementById('max-streak');

const ANSWER_COLORS = ['green', 'orange', 'red', 'blue'];

document.addEventListener('DOMContentLoaded', () => {
  prepareDOM();
  serveQuestionAndAnswer();
});

function prepareDOM() {
  currentStreak.innerHTML = `Current Streak: ${gameState.get('currentRound')}`;
  maxStreak.innerHTML = `Max Streak: ${
    localStorage.getItem('maxStreak') ? localStorage.getItem('maxStreak') : 0
  }`;
}

async function serveQuestionAndAnswer() {
  console.log(gameState);
  const questionDifficulty =
    gameState.get('currentRound') < 20
      ? 'easy'
      : gameState.get('currentRound') >= 20 &&
        gameState.get('currentRound') <= 60
      ? 'medium'
      : 'hard';
  const question = await getRandomQuestion(questionDifficulty);
  console.log(question);

  answerText.innerHTML = question.question;
  const answers = shuffle([
    question.correct_answer,
    ...question.incorrect_answers
  ]);
  answersList.innerHTML = '';
  answers.forEach((answer, i) => {
    const ansElement = document.createElement('div');
    ansElement.innerHTML = answer;
    ansElement.classList.add('answer', ANSWER_COLORS[i]);

    ansElement.addEventListener('click', () => {
      if (question.correct_answer === answer) {
        gameState.set('currentRound', gameState.get('currentRound') + 1);
        prepareDOM();
        serveQuestionAndAnswer();
      } else endGame();
    });
    answersList.appendChild(ansElement);
  });
}

function endGame() {
  if (
    !localStorage.getItem('maxStreak') ||
    localStorage.getItem('maxStreak') < gameState.get('currentRound')
  )
    localStorage.setItem('maxStreak', gameState.get('currentRound'));

  const endMessage = document.getElementById('end-message');
  const finalStreak = document.getElementById('final-streak');
  const maxStreak = document.getElementById('final-max');
  const playAgainBtn = document.getElementById('play-again');

  finalStreak.innerText = `Current Streak: ${gameState.get('currentRound')}`;
  maxStreak.innerText = `Max Streak: ${localStorage.getItem('maxStreak')}`;

  endMessage.classList.add('is-active');

  playAgainBtn.addEventListener('click', () => {
    endMessage.classList.remove('is-active');
    gameState.set('currentRound', 0);
    prepareDOM();
    serveQuestionAndAnswer();
  });
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
