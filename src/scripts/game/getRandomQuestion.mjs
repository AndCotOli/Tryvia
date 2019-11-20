async function getRandomQuestion() {
  let data = await fetch('https://opentdb.com/api.php?amount=1');
  let question = await data.json();
  return question.results[0];
}

export default getRandomQuestion;
