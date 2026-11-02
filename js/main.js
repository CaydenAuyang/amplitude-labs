// MAIN: starts the engine and connects everyone's parts. Owner: Lead.
// Teammates usually don't need to touch this file.
(function () {
  var engine = Matter.Engine.create();
  var render = Matter.Render.create({
    element: document.getElementById('stage'),
    engine: engine,
    options: {
      width: Game.WIDTH,
      height: Game.HEIGHT,
      wireframes: false,          // false = show colors
      background: '#1e293b'
    }
  });

  Game.buildWorld(engine.world);
  Game.setupControls(engine, render);
  Game.setupRules(engine);

  Matter.Render.run(render);
  var runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);

  document.getElementById('reset').addEventListener('click', function () {
    window.location.reload();
  });

  Game.engine = engine;   // handy for debugging in the browser console
})();
