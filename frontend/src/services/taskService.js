import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/tasks';

export const getTasks = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(API_BASE, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_BASE}/${id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};
