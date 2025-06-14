import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
  });
  const [id, setId] = useState(null);
  const API = "http://localhost:5000/tasks";

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${API}/${id}`, formData);
      } else {
        await axios.post(`${API}`, formData);
      }
      setFormData({ taskName: "", taskDescription: "" });
      setId(null);
      fetchTasks();
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setFormData({
      taskName: task.taskName,
      taskDescription: task.taskDescription,
    });
    setId(task.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-md shadow">
        <h1 className="text-2xl font-bold mb-6">Add New Task</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Task Name"
            value={formData.taskName}
            onChange={(e) =>
              setFormData({ ...formData, taskName: e.target.value })
            }
            className="flex-1 border rounded px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {id ? "Update Task" : "Add Task"}
          </button>
        </form>

        <input
          type="text"
          placeholder="Description"
          value={formData.taskDescription}
          onChange={(e) =>
            setFormData({ ...formData, taskDescription: e.target.value })
          }
          className="w-full border rounded px-4 py-2 mb-6"
          required
        />

        <h2 className="text-xl font-bold mb-4">Task List</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks added yet.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border border-gray-200 rounded p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{task.taskName}</p>
                  <p className="text-gray-600">{task.taskDescription}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className=" font-bold border border-gray-400 px-3 py-1 rounded hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="font-bold border border-red-500 text-red-600 px-3 py-1 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
