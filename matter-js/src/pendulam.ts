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
    width: window.innerWidth,
    height: window.innerHeight,
    showAngleIndicator: true,
  },
});

const noCollisionGroup = Body.nextGroup(true);
const rect = Bodies.rectangle(window.innerWidth / 2, 100, 300, 20, {
  collisionFilter: {
    group: noCollisionGroup,
  },
});

const constraint = Constraint.create({
  pointA: { x: window.innerWidth / 2 - 100, y: 100 },
  bodyB: rect,
  pointB: { x: 150, y: 0 },
  length: 0,
  stiffness: 1,
});
const circle = Bodies.circle(window.innerWidth / 2, 60, 50, {
  collisionFilter: {
    group: noCollisionGroup,
  },
  mass: 15,
});
const circleConstraint = Constraint.create({
  bodyA: rect,
  pointA: { x: -150, y: 0 },
  bodyB: circle,
  pointB: { x: 0, y: 0 },
  length: 0,
  stiffness: 1,
});

Composite.add(world, [rect, constraint, circle, circleConstraint]);

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
  },
});

Composite.add(world, mouseConstraint);

Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine);
