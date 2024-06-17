import { Engine, Render, Runner, Bodies, Composite } from "matter-js";

// create an engine
var engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.001 } });

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
});

// create two boxes and a ground
var boxA = Bodies.rectangle(300, 200, 240, 80, { isStatic: true });
var boxB = Bodies.rectangle(450, 50, 80, 80, {});
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var circle = Bodies.circle(450, 400, 50, {});
// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);
Composite.add(engine.world, [circle]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create({});

// run the engine
Runner.run(runner, engine);
