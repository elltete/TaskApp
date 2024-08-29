Application: Task generator

Functions:
    List all tasks
    List all pending tasks
    List all completed tasks
    List all deleted tasks
    Create new task
    Update name task
    Complete task
    Delete task
    
Commands:
    List all tasks -> node index.js list
    List all pending tasks -> node index.js list pendings 
    List all completed tasks -> node index.js list completed
    List all deleted tasks -> node index.js list deleted
    Create new task -> node index.js create "task_name"
    Update name task -> node index.js update "task_name" "new_task_name"
    Complete task -> node index.js complete "task_name"
    Delete task -> node index.js delete "task_name"


Task structure:
    "id": "uuid"
    "name": "nameTask"
    "creationDate": "date"
    "deleteDate": "date"
    "status": "pending" or "complete" or "delete"
