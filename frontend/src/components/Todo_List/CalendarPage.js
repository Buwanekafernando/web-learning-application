import React, { useEffect, useState } from 'react';
import CalendarView from './CalendarView';
import {
  getTasks,
  updateTask as updateTaskApi,
  deleteTask as removeTask
} from '../../services/taskService';

export default function CalendarPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const updateTask = async (id, updatedTask) => {
    const updated = await updateTaskApi(id, updatedTask);
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
    return updated;
  };

  const toggleStar = async (id) => {
    const task = tasks.find((t) => t.id === id);
    console.log('Toggling star for task ID:', id);
    console.log('Found task:', task);
  
    if (!task) {
      console.error('Task not found for ID:', id);
      return;
    }
  
    const updated = await updateTask(id, {
      ...task,
      starred: !task.starred,
    });
  
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
  };
  
  
  const deleteTask = async (id) => {
    await removeTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <CalendarView
      tasks={tasks}
      toggleStar={toggleStar}
      deleteTask={deleteTask}
      updateTask={updateTask}
    />
  );
}
