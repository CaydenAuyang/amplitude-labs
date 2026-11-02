// Shared settings and helpers. Owner: Lead (ask before changing).
// Everything the team shares lives on one global object called Game.
window.Game = {
  WIDTH: 900,
  HEIGHT: 560,
  COLORS: {
    wall: '#334155',
    player: '#f59e0b',
    box: '#38bdf8',
    goal: '#22c55e',
    danger: '#ef4444'
  },
  score: 0,
  player: null,   // set in world.js
  goal: null,     // set in world.js
  setMessage: function (text) {
    document.getElementById('message').textContent = text;
  },
  addScore: function (points) {
    Game.score += points;
    document.getElementById('score').textContent = Game.score;
  }
};
