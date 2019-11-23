import getRandomQuestion from './game/getRandomQuestion.mjs';
import gameState from './game/gameState.mjs';

const answerText = document.getElementById('question');
const answersList = document.getElementById('answers');
const currentStreak = document.getElementsByClassName('current')[0];
const maxStreak = document.getElementsByClassName('max')[0];

const ANSWER_COLORS = ['green', 'orange', 'red', 'blue'];

document.addEventListener('DOMContentLoaded', () => {
  prepareDOM();
  serveQuestionAndAnswer();
});

function prepareDOM() {
  currentStreak.innerHTML = `Current Streak: ${gameState.get('currentRound')}`;
  maxStreak.innerHTML = `Max Streak: ${localStorage.getItem('maxStreak')}`;
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
    const ansDiv = document.createElement('div');
    ansDiv.innerHTML = answer;
    ansDiv.className = `answer ${
      question.correct_answer === answer ? 'correct' : ''
    } ${ANSWER_COLORS[i]}`;
    ansDiv.addEventListener('click', () => {
      if (question.correct_answer === answer) {
        gameState.set('currentRound', gameState.get('currentRound') + 1);
        prepareDOM();
        serveQuestionAndAnswer();
      } else endGame();
    });
    answersList.appendChild(ansDiv);
  });
}

function endGame() {
  console.log('Sorry, you lost');
  if (
    !localStorage.getItem('maxStreak') ||
    localStorage.getItem('maxStreak') < gameState.get('currentRound')
  )
    localStorage.setItem('maxStreak', gameState.get('currentRound'));
  gameState.set('currentRound', 0);
  prepareDOM();
  serveQuestionAndAnswer();
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a - an array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
