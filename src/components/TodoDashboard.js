import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '@fontsource/kanit';
import { Modal } from 'react-responsive-modal';
import Tooltip from '@mui/material/Tooltip';
import 'react-responsive-modal/styles.css';
import DatePicker from 'react-datepicker'; // For date picker
import 'react-datepicker/dist/react-datepicker.css';

const ToDoDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState(null); // For due dates
  const [newSubtask, setNewSubtask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [editTaskDueDate, setEditTaskDueDate] = useState(null); // Editing due dates
  const [editSubtaskId, setEditSubtaskId] = useState(null);
  const [editSubtaskText, setEditSubtaskText] = useState('');
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);

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
        const response = await axios.post('http://localhost:8000/api/tasks', {
          text: newTask,
          status: 'To Do',
          dueDate: newDueDate // Include due date
        });
        setTasks([...tasks, response.data]);
        setNewTask('');
        setNewDueDate(null); // Reset due date
        setTaskModalOpen(false);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleEditTask = async (taskId) => {
    if (editTaskText.trim()) {
      try {
        const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
          text: editTaskText,
          dueDate: editTaskDueDate // Include due date when editing
        });
        setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
        setEditTaskId(null);
        setEditTaskText('');
        setEditTaskDueDate(null); // Reset due date
      } catch (error) {
        console.error('Error editing task:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
      fetchTasks(); 
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddSubtask = async (taskId) => {
    if (newSubtask.trim()) {
      try {
        const response = await axios.post(`http://localhost:8000/api/tasks/${taskId}/subtasks`, { text: newSubtask });
        setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
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
        setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
        setEditSubtaskId(null);
        setEditSubtaskText('');
      } catch (error) {
        console.error('Error editing subtask:', error);
      }
    }
  };

  const handleDeleteSubtask = async (taskId, subtaskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}/subtasks/${subtaskId}`);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId
            ? { ...task, subtasks: task.subtasks.filter(subtask => subtask._id !== subtaskId) }
            : task
        )
      );
    } catch (error) {
      console.error('Error deleting subtask:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}`, { status });
      setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleOpenTaskModal = () => setTaskModalOpen(true);
  const handleCloseTaskModal = () => {
    setTaskModalOpen(false);
    setNewTask('');
    setNewDueDate(null); // Reset due date
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  };

  const isOverdue = (task) => {
    // Check if dueDate exists and is valid
    if (!task.dueDate) return false; 
    const today = new Date();
    return new Date(task.dueDate) < today && task.status !== 'Completed';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-blue-100 to-pink-100 font-kanit">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-12 py-4 bg-white shadow-md font-sofadi z-50">
        <div className="text-2xl font-bold text-blue-600">TaskTrek</div>
        <div className="flex space-x-4">
          <Link to="/profile">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-all">
              Profile
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 border border-blue-600 py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="pt-20 px-8">
        <header className="flex flex-col items-center mb-9">
          <h1 className="text-5xl font-bold text-gray-800 text-center">My TO-DOs</h1>
          <button
            onClick={handleOpenTaskModal}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all text-sm"
          >
            <FaPlus className="inline mr-2" /> Add Task
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div
              key={task._id}
              className={`p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                task.status === 'Completed' ? 'bg-green-100' : isOverdue(task) ? 'bg-red-100' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  {editTaskId === task._id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editTaskText}
                        onChange={e => setEditTaskText(e.target.value)}
                        className="border-b border-blue-600 mr-2"
                      />
                      <DatePicker
                        selected={editTaskDueDate}
                        onChange={date => setEditTaskDueDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Due Date"
                        className="border-b border-blue-600"
                      />
                      <button onClick={() => handleEditTask(task._id)} className="text-blue-600 ml-2">Save</button>
                    </div>
                  ) : (
                    <h2 className={`text-lg font-semibold ${isOverdue(task) ? 'text-red-600' : ''}`}>
                      {task.text}
                    </h2>
                  )}
                  {task.dueDate && (
                    <p className="text-sm text-gray-600">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditTaskId(task._id);
                      setEditTaskText(task.text);
                      setEditTaskDueDate(new Date(task.dueDate));
                    }}
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <ol className="mt-4 list-decimal ml-4">
                {task.subtasks.map(subtask => (
                  <li key={subtask._id} className="mb-2">
                    {editSubtaskId === subtask._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editSubtaskText}
                          onChange={e => setEditSubtaskText(e.target.value)}
                          className="border-b border-blue-600 mr-2"
                        />
                        <button onClick={() => handleEditSubtask(task._id, subtask._id)} className="text-blue-600">Save</button>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <span>{subtask.text}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditSubtaskId(subtask._id);
                              setEditSubtaskText(subtask.text);
                            }}
                            className="text-blue-600"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteSubtask(task._id, subtask._id)}
                            className="text-red-600"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ol>

              <div className="mt-3 flex">
                <input
                  type="text"
                  placeholder="Add a subtask"
                  value={newSubtask}
                  onChange={e => setNewSubtask(e.target.value)}
                  className="border-b border-blue-600 mr-2"
                />
                <button
                  onClick={() => handleAddSubtask(task._id)}
                  className="text-blue-600"
                >
                  <FaPlus />
                </button>
              </div>

              <div className="mt-4">
              <select
                        value={task.status}
                        onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                        className="mt-1.5 p-2 border border-gray-400 rounded-full"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    
                  {/* <button
                    onClick={() => handleUpdateTaskStatus(task._id, task.status === 'Completed' ? 'To Do' : 'Completed')}
                    className={`px-4 py-2 rounded-full shadow ${task.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  > */}
                    {/* {task.status === 'Completed' ? 'Completed' : 'Mark as Complete'} */}
                  {/* </button> */}
                
              </div>
            </div>
          ))}
        </section>

        {/* Add Task Modal */}
        <Modal open={isTaskModalOpen} onClose={handleCloseTaskModal} center>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-3">Add New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              className="w-full border-b border-blue-600 mb-3"
            />
            <DatePicker
              selected={newDueDate}
              onChange={date => setNewDueDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Due Date"
              className="w-full border-b border-blue-600"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-5 py-2 rounded-full mt-4 hover:bg-blue-700 transition-all"
            >
              Add Task
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ToDoDashboard;
