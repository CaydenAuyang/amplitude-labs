// RULES: scoring, winning, losing. Owner: Rules & Look person.
Game.setupRules = function (engine) {
  Matter.Events.on(engine, 'collisionStart', function (event) {
    event.pairs.forEach(function (pair) {
      var labels = [pair.bodyA.label, pair.bodyB.label];
      if (labels.indexOf('player') !== -1 && labels.indexOf('goal') !== -1) {
        Game.addScore(1);
        Game.setMessage('Goal! Score ' + Game.score);
        // Send the player back to the start
        Matter.Body.setPosition(Game.player, { x: 120, y: Game.HEIGHT - 60 });
        Matter.Body.setVelocity(Game.player, { x: 0, y: 0 });
      }
    });
  });
};
