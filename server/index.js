import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "../client/build")));


let tasks = [];


app.post("/tasks", (req, res) => {
  const { taskName, taskDescription } = req.body;
  const newTask = {
    id: Date.now().toString(),
    taskName,
    taskDescription,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { taskName, taskDescription } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  task.taskName = taskName;
  task.taskDescription = taskDescription;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
