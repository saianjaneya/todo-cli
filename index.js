#!/usr/bin/env node

import { ACTIONS } from "./actions_pg.js";

const args = process.argv.slice(2);

const action = args[0];

switch (action) {
  case "list":
  case undefined: {
    await ACTIONS.list();
    break;
  }
  case "add": {
    await ACTIONS.add(args[1]);
    break;
  }
  case "clear": {
    await ACTIONS.clear();
    break;
  }
  case "remove": {
    await ACTIONS.remove(args[1]);
    break;
  }
  case "done": {
    await ACTIONS.done(args[1]);
    break;
  }
  case "undone": {
    await ACTIONS.undone(args[1]);
    break;
  }
  case "edit": {
    break;
  }
  default: {
    console.log(`Invalid cmd`);
  }
}

process.exit(0);
/**
 todos add "text here..." - Add todo

 todos remove 1 - Removed todo numer 1
 todos clear  - Remove all todos 

 todos done 1
 todos undone 1
 
 todos - Print all todos 
 todos list - Print all todos 

 todos edit 1 "text here..." - Edits text for todo 1
 */
