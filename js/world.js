// WORLD: what is in the level. Owner: World Builder.
// Add, remove or move bodies here. Docs: https://brm.io/matter-js/docs/
Game.buildWorld = function (world) {
  var Bodies = Matter.Bodies, Composite = Matter.Composite;
  var W = Game.WIDTH, H = Game.HEIGHT, C = Game.COLORS;

  // Walls and floor (isStatic = never moves)
  var wallStyle = { isStatic: true, render: { fillStyle: C.wall } };
  var walls = [
    Bodies.rectangle(W / 2, H + 25, W, 50, wallStyle),   // floor
    Bodies.rectangle(-25, H / 2, 50, H, wallStyle),      // left
    Bodies.rectangle(W + 25, H / 2, 50, H, wallStyle),   // right
    Bodies.rectangle(W / 2, -25, W, 50, wallStyle)       // ceiling
  ];

  // A platform to jump onto
  var platform = Bodies.rectangle(620, 380, 220, 20, wallStyle);

  // A stack of boxes to knock over
  var boxes = Matter.Composites.stack(380, 300, 3, 4, 2, 2, function (x, y) {
    return Bodies.rectangle(x, y, 40, 40, { render: { fillStyle: C.box } });
  });

  // The player
  Game.player = Bodies.circle(120, H - 60, 22, {
    label: 'player',
    friction: 0.05,
    restitution: 0.3,
    render: { fillStyle: C.player }
  });

  // The goal is a sensor: things pass through it but it still detects touches
  Game.goal = Bodies.rectangle(640, 340, 50, 50, {
    label: 'goal',
    isStatic: true,
    isSensor: true,
    render: { fillStyle: C.goal, opacity: 0.6 }
  });

  Composite.add(world, walls.concat([platform, boxes, Game.player, Game.goal]));
};
