// App.jsx
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("https://todo-app-7sgu.onrender.com/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  const handleAddOrEditTask = () => {
    if (title.trim() === "") return;

    if (editingTask) {
      // Editing existing task
      axios
        .put(`https://todo-app-7sgu.onrender.com/tasks/${editingTask.id}`, {
          ...editingTask,
          title,
        })
        .then(() => {
          setTitle("");
          setEditingTask(null);
          setShowDialog(false);
          fetchTasks();
        })
        .catch((err) => console.error("Error updating task:", err));
    } else {
      // Adding new task
      axios
        .post("https://todo-app-7sgu.onrender.com/tasks", {
          title,
          completed: false,
        })
        .then(() => {
          setTitle("");
          setShowDialog(false);
          fetchTasks();
        })
        .catch((err) => console.error("Error adding task:", err));
    }
  };

  const toggleComplete = (task) => {
    axios
      .put(`https://todo-app-7sgu.onrender.com/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
      })
      .then(fetchTasks)
      .catch((err) => console.error("Error toggling task:", err));
  };

  const deleteTask = (id) => {
    axios
      .delete(`https://todo-app-7sgu.onrender.com/tasks/${id}`)
      .then(fetchTasks)
      .catch((err) => console.error("Error deleting task:", err));
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingTask(task);
    setShowDialog(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>🚀 To-Do App</h1>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        handleEdit={handleEdit}
      />

      <button
        className="floating-btn"
        onClick={() => {
          setTitle("");
          setEditingTask(null);
          setShowDialog(true);
        }}
      >
        ➕
      </button>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>{editingTask ? "Edit Task" : "Add New Task"}</h3>
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="dialog-actions">
              <button onClick={handleAddOrEditTask}>
                {editingTask ? "Update" : "Add"}
              </button>
              <button onClick={() => setShowDialog(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
