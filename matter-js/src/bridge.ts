import {
  Bodies,
  Body,
  Composite,
  Composites,
  Constraint,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";

// create engine
var engine = Engine.create(),
  world = engine.world;

// create renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    showAngleIndicator: true,
  },
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var group = Body.nextGroup(true);

var bridge = Composites.stack(
  160,
  290,
  10,
  1,
  0,
  0,
  function (x: number, y: number) {
    return Bodies.rectangle(x - 20, y, 50, 20, {
      collisionFilter: { group: group },
      chamfer: { radius: 0 },
      density: 0.005,
      frictionAir: 0.05,
      mass: 1,
      render: {
        fillStyle: "#060a19",
      },
    });
  }
);

Composites.chain(bridge, 0.3, 0, -0.3, 0, {
  stiffness: 0.99,
  length: 0.0001,
  render: {
    visible: false,
  },
});

// add a circle
const circle = Bodies.circle(400, 0, 50, { mass: 30 });

Composite.add(world, [
  bridge,
  circle,
  Constraint.create({
    pointA: { x: 100, y: 300 },
    bodyB: bridge.bodies[0],
    pointB: { x: -25, y: 0 },
    stiffness: 0.9,
    length: 2,
  }),
  Constraint.create({
    pointA: { x: 700, y: 300 },
    bodyB: bridge.bodies[bridge.bodies.length - 1],
    pointB: { x: 25, y: 0 },
    stiffness: 0.9,
    length: 2,
  }),
]);
// add mouse control
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.1,
    render: {
      visible: true,
      type: "spring",
    },
  },
});

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

let min = { x: 0, y: 0 };
let max = { x: 800, y: 600 };
// fit the render viewport to the scene
Render.lookAt(render, {
  min,
  max,
});
