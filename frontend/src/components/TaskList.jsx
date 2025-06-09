import React from "react";

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <span
            className="task-title"
            onClick={() => toggleComplete(task)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </span>
          <button className="delete-btn" onClick={() => deleteTask(task.id)}>
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
