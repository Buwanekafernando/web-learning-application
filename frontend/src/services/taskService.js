import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/tasks';

// Helper function to format dates for the API
const formatDateForApi = (dateString) => {
  if (!dateString) return null;
  // If it's already a date string in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  // Otherwise, create a new date and format it
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const getTasks = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const createTask = async (task) => {
  const formattedTask = {
    ...task,
    date: formatDateForApi(task.date),
    userId: 0 // Set default userId as 0 to match the database
  };
  const res = await axios.post(API_BASE, formattedTask);
  return res.data;
};

export const updateTask = async (id, task) => {
  const formattedTask = {
    ...task,
    date: formatDateForApi(task.date),
    userId: 0 // Set default userId as 0 to match the database
  };
  const res = await axios.put(`${API_BASE}/${id}`, formattedTask);
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};
