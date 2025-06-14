import React from "react";
import "./index.css"; // Ensure Tailwind styles are applied

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          📝 Task Manager
        </h1>

        {/* Task Form */}
        <form className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Task Description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </form>

        {/* Task List Placeholder */}
        <div className="space-y-2">
          <div className="p-4 border rounded-md flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Sample Task</h2>
              <p className="text-sm text-gray-600">Task description goes here...</p>
            </div>
            <div className="space-x-2">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
