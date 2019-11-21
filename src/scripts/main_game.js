import getRandomQuestion from './game/getRandomQuestion.mjs';
import gameState from './game/gameState.mjs';

const startButton = document.getElementById('startButton');
const answerText = document.getElementById('question');
const answersList = document.getElementById('answers');

startButton.addEventListener('click', async () => {
  serveQuestionAndAnswer();
});

async function serveQuestionAndAnswer() {
  console.log(gameState);
  const question = await getRandomQuestion();

  gameState.set('currentDifficulty', question.difficulty);
  console.log(gameState.get('currentDifficulty'));
  answerText.innerHTML = question.question;
  const answers = shuffle([
    question.correct_answer,
    ...question.incorrect_answers
  ]);
  answersList.innerHTML = '';
  answers.forEach(answer => {
    const ansDiv = document.createElement('div');
    ansDiv.innerText = answer;
    ansDiv.addEventListener('click', () => {
      if (question.correct_answer === answer) {
        gameState.set('streakCount', gameState.get('streakCount') + 1);
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
    localStorage.getItem('maxStreak') < gameState.get('streakCount')
  )
    localStorage.setItem('maxStreak', gameState.get('streakCount'));
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
