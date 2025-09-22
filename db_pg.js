import { Client } from "pg";
const pgClient = new Client({
  database: "todo-cli",
});
await pgClient.connect();

// Gracefully close on exit
process.on("exit", async () => {
  await pgClient.end();
});

// Handle Ctrl+C (SIGINT)
process.on("SIGINT", async () => {
  await pgClient.end();
  process.exit(0);
});

// Handle kill (SIGTERM)
process.on("SIGTERM", async () => {
  await pgClient.end();
  process.exit(0);
});

export default pgClient;
