import React, { useEffect, useState } from 'react';
import MyDay from './MyDay';
import {
  getTasks,
  createTask,
  updateTask as updateTaskApi,
  deleteTask as removeTask
} from '../../services/taskService';

export default function MyDayPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const addTask = async (title, date) => {
    const newTask = await createTask({ title, date, starred: false });
    setTasks([newTask, ...tasks]); // add to top
  };

  const toggleStar = async (id) => {
    const task = tasks.find(t => t.id === id);
    const updated = await updateTaskApi(id, { ...task, starred: !task.starred });
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await removeTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  // ✅ This is the fix: update in backend + state
  const updateTask = async (id, updatedTask) => {
    const updated = await updateTaskApi(id, updatedTask);
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
  };

  return (
    <MyDay
      tasks={tasks}
      addTask={addTask}
      toggleStar={toggleStar}
      deleteTask={deleteTask}
      updateTask={updateTask} // ✅ fixed
    />
  );
}
