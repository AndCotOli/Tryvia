import State from '../State.mjs';

const state = new State('gameState', {
  streakCount: 0,
  isPlaying: false,
  currentDifficulty: ''
});

export default state;
