import { DB } from "./db.js";
import { displayTodos } from "./display.js";

function list() {
  const todos = DB.load();
  displayTodos(todos);
}

function add(text) {
  if (!text || typeof text !== "string" || text.trim() === "") {
    console.log(`Invalid todo text`);
    return;
  }

  const todos = DB.load();
  todos.push({ text: text.trim(), done: false });

  console.log(`Added "${text.trim()}" as todo ✅`);
  DB.save(todos);
}

function clear() {
  DB.save([]);
  console.log("Cleared all todos ✅");
}

function done(no) {
  const todos = DB.load();
  const index = Number(no) - 1;
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log(`Invalid todo number selected`);
    return;
  }

  todos[index].done = true;
  DB.save(todos);
  displayTodos(todos);
}

function undone(no) {
  const index = Number(no) - 1;
  const todos = DB.load();
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log(`Invalid todo number selected`);
    return;
  }

  todos[index].done = false;
  DB.save(todos);

  displayTodos(todos);
}

function remove(no) {
  const index = Number(no) - 1;
  const todos = DB.load();
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log(`Invalid todo number selected`);
    return;
  }

  todos.splice(index, 1);
  DB.save(todos);

  displayTodos(todos);
}

export const ACTIONS = {
  add,
  list,
  remove,
  clear,
  done,
  undone,
};
