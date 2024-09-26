import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import '@fontsource/kanit';

const ToDoDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editSubtaskId, setEditSubtaskId] = useState(null);
  const [editSubtaskText, setEditSubtaskText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axios.post('http://localhost:8000/api/tasks', { text: newTask, status: 'To Do' });
        setTasks([...tasks, response.data]);
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleEditTask = async (taskId) => {
    if (newTask.trim()) {
      try {
        const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}`, { text: newTask });
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
        setEditTaskId(null);
        setNewTask('');
      } catch (error) {
        console.error('Error editing task:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleAddSubtask = async (taskId) => {
    if (newSubtask.trim()) {
      try {
        const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}/subtasks`, { text: newSubtask });
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
        setNewSubtask('');
      } catch (error) {
        console.error('Error adding subtask:', error);
      }
    }
  };

  const handleEditSubtask = async (taskId, subtaskId) => {
    if (editSubtaskText.trim()) {
      try {
        const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}/subtasks/${subtaskId}`, { text: editSubtaskText });
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
        setEditSubtaskId(null);
        setEditSubtaskText('');
      } catch (error) {
        console.error('Error editing subtask:', error);
      }
    }
  };

  const handleDeleteSubtask = async (taskId, subtaskId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}/subtasks/${subtaskId}`);
      setTasks(tasks.map(task => task._id === taskId ? response.data : task));
    } catch (error) {
      console.error('Error deleting subtask:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}/status`, { status });
      setTasks(tasks.map(task => task._id === taskId ? response.data : task));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
   
  <div className="bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen p-8 font-kanit">
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-5xl font-bold text-gray-800">To-Do Dashboard</h1>
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Profile</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300">Logout</button>
      </div>
    </header>

      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Task Overview</h2>
        <p className="text-xl text-gray-600">
          You have <span className="font-bold text-blue-600">{tasks.length}</span> main tasks.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">Tasks</h2>
        <div className="space-y-6">
          {tasks.map(task => (
            <div key={task._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{task.text}</h3>
                  <select
                    value={task.status}
                    onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                    className="mt-2 border border-gray-300 rounded-md"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleDeleteTask(task._id)} className="text-red-600">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              {/* Subtasks */}
              <div className="ml-6 mt-4">
                {task.subtasks && task.subtasks.map(subtask => (
                  <div key={subtask._id} className="flex items-center justify-between">
                    {editSubtaskId === subtask._id ? (
                      <input
                        type="text"
                        value={editSubtaskText}
                        onChange={(e) => setEditSubtaskText(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2"
                      />
                    ) : (
                      <span className={subtask.completed ? 'line-through' : ''}>{subtask.text}</span>
                    )}
                    <div className="flex space-x-2">
                      {editSubtaskId === subtask._id ? (
                        <button onClick={() => handleEditSubtask(task._id, subtask._id)} className="text-blue-600">Save</button>
                      ) : (
                        <>
                          <button onClick={() => { setEditSubtaskId(subtask._id); setEditSubtaskText(subtask.text); }} className="text-blue-600">
                            <FaEdit />
                          </button>
                          <button onClick={() => handleDeleteSubtask(task._id, subtask._id)} className="text-red-600">
                            <FaTrashAlt />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-center mt-4">
                  <input
                    type="text"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    placeholder="Add a subtask..."
                    className="border border-gray-300 rounded-lg px-4 py-2 mr-2"
                  />
                  <button onClick={() => handleAddSubtask(task._id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Add New Task</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="border border-gray-300 rounded-lg px-4 py-2 mr-2"
          />
          <button onClick={handleAddTask} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            <FaPlus />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ToDoDashboard;
