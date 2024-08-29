import fs from "node:fs";
import { randomUUID } from "crypto";
import { _error } from "./errors.js";

const URL_FILE = "./data/tasks.json";
const HELP_FILE = "./data/help";

//node index.js help -> information about commands
const help = () => {
  const exist = fs.existsSync(HELP_FILE);
  if (!exist) {
    return _error("invalidFile");
  } else {
    return fs.readFileSync(HELP_FILE, "utf-8");
  }
};

const readTasks = (option) => {
  const exist = fs.existsSync(URL_FILE);

  if (!exist) {
    fs.writeFileSync(URL_FILE, JSON.stringify([]));
    return [];
  }

  //node index.js list -> List all tasks
  if (option === undefined) {
    const data = fs.readFileSync(URL_FILE);
    return JSON.parse(data);
  }

  //node index.js list pendings -> List all pending tasks
  if (option === "pendings") {
    const data = JSON.parse(fs.readFileSync(URL_FILE));
    const dataOption = data.filter((task) => task.status === "pending");
    return dataOption;
  }

  //node index.js list completed -> List all completed tasks
  if (option === "completed") {
    const data = JSON.parse(fs.readFileSync(URL_FILE));
    const dataOption = data.filter((task) => task.status === "completed");
    return dataOption;
  }

  //node index.js list deleted -> List all deleted tasks
  if (option === "deleted") {
    const data = JSON.parse(fs.readFileSync(URL_FILE));
    const dataOption = data.filter((task) => task.status === "deleted");
    return dataOption;
  }

  return _error("invalidArgs");
};

//node index.js create "task_name" -> Create new task
const createTask = (name) => {
  if (!name) return _error("invalidArgs");
  const taskstData = readTasks();
  const foundTask = taskstData.find((task) => task.name === name.toLowerCase());
  if (foundTask) return _error("taskNameExist");

  const task = {
    id: randomUUID(),
    name: name.toLowerCase(),
    creationDate: new Date().toString(),
    daleteDate: 0,
    status: "pending"
  };

  taskstData.push(task);

  fs.writeFileSync(URL_FILE, JSON.stringify(taskstData));

  return task;
};

//node index.js update "task_name" "new_task_name" -> Update name task
const updateTask = (name, newName) => {
  if (!name || !newName) return _error("invalidArgs");

  const taskstData = readTasks();
  const foundTask = taskstData.find((task) => task.name === name.toLowerCase());
  if (!foundTask) return _error("taskNameNotFound");

  const foundNewTask = taskstData.find(
    (task) => task.name === newName.toLowerCase()
  );
  if (foundNewTask) return _error("taskNewNameExist");

  return changeNameTask(name, newName);
};

const changeNameTask = (name, newName) => {
  const taskstData = readTasks();
  const task = taskstData.map((task) => {
    if (task.name === name.toLowerCase()) {
      task.name = newName;
    }
    return task;
  });
};

//node index.js complete "task_name" -> Complete task
const completeTask = (name) => {
  return changeStatus(name, "complete");
};

//node index.js delete "task_name" -> Delete task
const deleteTask = (name) => {
  return changeStatus(name, "deleted");
};

const changeStatus = (name, status) => {
  if (!name) return _error("invalidArgs");
  const taskstData = readTasks();
  const foundTask = taskstData.find((task) => task.name === name.toLowerCase());
  if (!foundTask) return _error("taskNameNotFound");

  const newTasks = taskstData.map((task) => {
    if (task.name === name.toLowerCase()) {
      task.status = status;
      if(status === "deleted"){
        task.deleteDate = new Date().toString();
      }
    }
    return task;
  });

  fs.writeFileSync(URL_FILE, JSON.stringify(newTasks));

  return foundTask;
};

export { help, readTasks, createTask, updateTask, completeTask, deleteTask };
