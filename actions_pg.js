import client from "./db_pg.js";

function logAll(rows) {
  if (rows.length === 0) {
    console.log("No todos found!");
    return;
  }

  for (const row of rows) {
    logOne(row);
  }
}

function logOne(row) {
  console.log(`${row.done ? "✓" : "⨯"} (${row.id}) ${row.text}`);
}

// List all todos
async function listTodos() {
  const result = await client.query("SELECT * FROM todos;");
  logAll(result.rows);
}

// Add a new todo
async function addTodo(text) {
  const result = await client.query(
    "INSERT INTO todos (text, done) VALUES ($1, FALSE) RETURNING *;",
    [text]
  );

  await listTodos();
  console.log(`Added successfully: ✅`);
  return result.rows[0];
}

// Remove a todo by ID
async function removeTodo(id) {
  await client.query("DELETE FROM todos WHERE id = $1;", [id]);

  await listTodos();
  console.log(`Removed successfully: ✅`);
  return { success: true };
}

// Clear all todos
async function clearTodos() {
  await client.query("DELETE FROM todos;");
  console.log(`Cleared All todos! ✅`);
  return { success: true };
}

// Mark as done
async function markDone(id) {
  const result = await client.query(
    "UPDATE todos SET done = TRUE WHERE id = $1 RETURNING *;",
    [id]
  );
  await listTodos();
  return result.rows[0];
}

// Mark as undone
async function markUndone(id) {
  const result = await client.query(
    "UPDATE todos SET done = FALSE WHERE id = $1 RETURNING *;",
    [id]
  );
  await listTodos();
  return result.rows[0];
}

export const ACTIONS = {
  add: addTodo,
  list: listTodos,
  remove: removeTodo,
  clear: clearTodos,
  done: markDone,
  undone: markUndone,
};
