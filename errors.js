const _error = (id) => {
  switch (id) {
    case "invalidArgs":
      return "Invalid Arguments... (use help command)";
    case "taskNameNotFound":
      return "Task name not found";
    case "taskNewNameExist":
      return "Task new name exist";
    case "taskNameExist":
      return "Task name exist";
    case "invalidFile":
      return "File not found";
    default:
      return "Error not registered";
  }
};

export { _error };
