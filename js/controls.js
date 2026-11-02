// CONTROLS: how the player interacts. Owner: Controls person.
Game.setupControls = function (engine, render) {
  var Body = Matter.Body;
  var keys = {};

  window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
    if (e.key.indexOf('Arrow') === 0 || e.key === ' ') e.preventDefault();
  });
  window.addEventListener('keyup', function (e) { keys[e.key] = false; });

  // Runs every physics step
  Matter.Events.on(engine, 'beforeUpdate', function () {
    var p = Game.player;
    if (!p) return;
    var force = 0.0012 * p.mass;
    if (keys['ArrowLeft'])  Body.applyForce(p, p.position, { x: -force, y: 0 });
    if (keys['ArrowRight']) Body.applyForce(p, p.position, { x: force, y: 0 });
    // Jump only when nearly still vertically, so you can't fly
    if ((keys['ArrowUp'] || keys[' ']) && Math.abs(p.velocity.y) < 0.5) {
      Body.setVelocity(p, { x: p.velocity.x, y: -11 });
    }
  });

  // Drag any non-static body with the mouse
  var mouse = Matter.Mouse.create(render.canvas);
  var mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: { stiffness: 0.2, render: { visible: false } }
  });
  Matter.Composite.add(engine.world, mouseConstraint);
  render.mouse = mouse;
};
