import React, { useState } from "react";
import TaskList from "./components/TaskList";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim() === "") return;

    axios
      .post("http://127.0.0.1:8000/tasks", {
        title: title,
        completed: false,
      })
      .then(() => {
        setTitle(""); // Clear input
        window.location.reload(); // TEMP: Reload to show new task
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div>
      <h1>To-Do App</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>

      <TaskList />
    </div>
  );
}

export default App;
