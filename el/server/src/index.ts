import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { title } from "process";
import _ from "lodash";

const app = new Elysia()
  .use(cors())
  .state("todos", [] as { id: number; title: string; completed: boolean }[])
  .get("/", ({ store: { todos } }) => {
    return todos;
  })
  .get("/task/:id", ({ params: { id }, store: { todos } }) => {
    return _.find(todos, (todo) => todo.id === +id);
  })
  .delete("/task/:id", ({ params: { id }, store: { todos } }) => {
    return _.remove(todos, (todo) => todo.id === +id);
  })
  .patch("/mark-complete/:id", ({ params: { id }, store: { todos } }) => {
    const todo = _.find(todos, (todo) => todo.id === +id);
    if (todo) {
      todo.completed = true;
      return todo;
    }
  })
  .post(
    "/",
    ({ body, store: { todos } }) => {
      const timestamp = Date.now();
      const todo = {
        id: timestamp,
        ...body,
      };
      todos.push(todo);
      return todo;
    },
    {
      body: t.Object({
        title: t.String(),
        completed: t.Boolean(),
      }),
    }
  )
  .get("/title", () => {
    return {
      title: "Todos - App",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
