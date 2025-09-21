export function displayTodos(todos) {
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    console.log(`${i + 1} (${todo.done ? "✓" : "ⅹ"}) ${todo.text}`);
  }
}
