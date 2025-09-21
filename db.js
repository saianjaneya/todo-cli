import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const FILE_PATH = `${DIR}/todos.json`;

function load() {
  try {
    const result = fs.readFileSync(FILE_PATH);
    return JSON.parse(result.toString());
  } catch (error) {
    console.log(`🎈 Failed to load todos`, error);
  }
}

function save(todos) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos));
  } catch (error) {
    console.log(`❗️ Failed to save todos`, error);
  }
}

export const DB = { load, save };
