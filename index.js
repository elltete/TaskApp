
import { help, readTasks , createTask, updateTask, completeTask, deleteTask } from "././modules.js";
import { _error } from "./errors.js";

const args = process.argv.splice(2);

const input = args[0].toLowerCase();

switch (input) {
    case "help":
        console.log(help());
    break;
    case "list":
        console.log(readTasks(args[1]));
    break;
    case "create":
        console.log(createTask(args[1]));
    break;
    case "update":
        console.log(updateTask(args[1]),args[2]);
    break;
    case "complete":
        console.log(completeTask(args[1]));
    break;
    case "delete":
        console.log(deleteTask(args[1]));
    break;
    default:
        console.log(_error("invalidArgs"));
}