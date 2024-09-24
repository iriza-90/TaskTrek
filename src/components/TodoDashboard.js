import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrashAlt, FaCheck, FaEdit } from 'react-icons/fa';
// import './katin-font.css'; 

const ToDoDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editSubtaskId, setEditSubtaskId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      axios.post('http://localhost:8000/api/tasks', { text: newTask, status: 'To Do' })
        .then(response => {
          setTasks([...tasks, response.data]);
          setNewTask('');
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  const handleEditTask = (taskId) => {
    axios.put(`http://localhost:8000/api/tasks/${taskId}`, { text: newTask })
      .then(response => {
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
        setEditTaskId(null);
        setNewTask('');
      })
      .catch(error => console.error('Error editing task:', error));
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:8000/api/tasks/${taskId}`)
      .then(() => setTasks(tasks.filter(task => task._id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleAddSubtask = (taskId) => {
    if (newSubtask.trim()) {
      const updatedSubtasks = tasks.find(task => task._id === taskId).subtasks || [];
      updatedSubtasks.push({ text: newSubtask, completed: false });

      axios.put(`http://localhost:8000/api/tasks/${taskId}`, { subtasks: updatedSubtasks })
        .then(response => {
          setTasks(tasks.map(task => task._id === taskId ? response.data : task));
          setNewSubtask('');
        })
        .catch(error => console.error('Error adding subtask:', error));
    }
  };

  const handleEditSubtask = (taskId, subtaskIndex, newText) => {
    const taskToUpdate = tasks.find(task => task._id === taskId);
    taskToUpdate.subtasks[subtaskIndex].text = newText;

    axios.put(`http://localhost:8000/api/tasks/${taskId}`, { subtasks: taskToUpdate.subtasks })
      .then(response => {
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
        setEditSubtaskId(null);
      })
      .catch(error => console.error('Error editing subtask:', error));
  };

  const handleDeleteSubtask = (taskId, subtaskIndex) => {
    const updatedSubtasks = tasks.find(task => task._id === taskId).subtasks;
    updatedSubtasks.splice(subtaskIndex, 1);

    axios.put(`http://localhost:8000/api/tasks/${taskId}`, { subtasks: updatedSubtasks })
      .then(response => {
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
      })
      .catch(error => console.error('Error deleting subtask:', error));
  };

  const handleChangeStatus = (taskId, newStatus) => {
    axios.put(`http://localhost:8000/api/tasks/${taskId}`, { status: newStatus })
      .then(response => {
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
      })
      .catch(error => console.error('Error updating status:', error));
  };

  return (
    <div className="bg-gradient-to-r from-white via-[#edf6ff] to-[#f6f3ff] min-h-screen p-8 font-katin">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">To-Do Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
          Profile
        </button>
      </header>

      <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Task Overview</h2>
        <p className="text-xl text-gray-600">
          You have {tasks.length} main tasks to complete. Stay organized and manage your tasks efficiently!
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Main Task List</h2>
        <div className="space-y-6">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {editTaskId === task._id ? (
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  ) : (
                    <h3 className={`text-xl ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.text}
                    </h3>
                  )}
                </div>
                <div className="flex space-x-2">
                  {editTaskId === task._id ? (
                    <button
                      onClick={() => handleEditTask(task._id)}
                      className="text-green-600 hover:text-green-800 transition duration-300"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditTaskId(task._id)}
                      className="text-blue-600 hover:text-blue-800 transition duration-300"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-600 hover:text-red-800 transition duration-300"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <div className="ml-8 space-y-4">
                {task.subtasks && task.subtasks.map((subtask, subtaskIndex) => (
                  <div key={subtaskIndex} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => handleEditSubtask(task._id, subtaskIndex, subtask.text)}
                        className="mr-4"
                      />
                      {editSubtaskId === subtaskIndex ? (
                        <input
                          type="text"
                          value={subtask.text}
                          onChange={(e) => handleEditSubtask(task._id, subtaskIndex, e.target.value)}
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      ) : (
                        <span className={`text-lg ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {subtask.text}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditSubtaskId(subtaskIndex)}
                        className="text-blue-600 hover:text-blue-800 transition duration-300"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteSubtask(task._id, subtaskIndex)}
                        className="text-red-600 hover:text-red-800 transition duration-300"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    placeholder="Add a new subtask..."
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 flex-grow"
                  />
                  <button
                    onClick={() => handleAddSubtask(task._id)}
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 ml-2 hover:bg-blue-700 transition duration-300"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoDashboard;
