"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { treaty } from "@elysiajs/eden";
import { App } from "../../../server/src/index";
import { useEffect, useState } from "react";

const app = treaty<App>("http://localhost:3000");

export function TodoPage() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<
    { id: number; title: string; completed: boolean }[]
  >([]);

  useEffect(() => {
    (async function () {
      const { data } = await app.title.get();
      if (data) setTitle(data.title);
    })();
  }, []);

  const fetchTodos = async () => {
    const { data } = await app.index.get();
    if (data) setTodos(data);
  };

  const deleteTodo = async (id: number) => {
    await app.task({ id }).delete();
    fetchTodos();
  };

  const addTodo = async (title: string) => {
    await app.index.post({ title, completed: false });
    fetchTodos();
  };

  const markComplete = async (id: number) => {
    await app["mark-complete"]({ id }).patch();
    fetchTodos();
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-opacity-10 backdrop-blur-lg backdrop-filter">
      <header className="w-full border-b p-4 bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold">{title}</h1>
      </header>
      <main className="w-full flex flex-col p-6 gap-6 items-center">
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
          <form className="flex w-full">
            <label className="sr-only" htmlFor="new-todo">
              New todo
            </label>
            <Input
              className="w-full"
              id="new-todo"
              placeholder="What needs to be done?"
            />
            <Button className="ml-auto" type="submit" variant="ghost">
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">Add</span>
            </Button>
          </form>
        </div>
        <div className="flex flex-col w-full lg:w-1/2 gap-4">
          <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-4">
              <Checkbox
                className="peer h-4 w-4 border-gray-300 dark:border-gray-800"
                id="todo1"
              />
              <label
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="todo1"
              >
                Buy groceries
              </label>
            </div>
            <Button className="h-8 w-8" size="icon" variant="ghost">
              <TrashIcon className="h-6 w-6" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
          <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-4">
              <Checkbox
                className="peer h-4 w-4 border-gray-300 dark:border-gray-800"
                defaultChecked
                id="todo2"
              />
              <label
                className="line-through peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="todo2"
              >
                Call mom
              </label>
            </div>
            <Button className="h-8 w-8" size="icon" variant="ghost">
              <TrashIcon className="h-6 w-6" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
          <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-4">
              <Checkbox
                className="peer h-4 w-4 border-gray-300 dark:border-gray-800"
                id="todo3"
              />
              <label
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="todo3"
              >
                Complete assignment
              </label>
            </div>
            <Button className="h-8 w-8" size="icon" variant="ghost">
              <TrashIcon className="h-6 w-6" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
