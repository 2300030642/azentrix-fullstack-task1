import axios from "axios";

const API_URL =
  "https://azentrix-fullstack-task1-backend.onrender.com/api/transactions";

export const getTransactions = () =>
  axios.get(API_URL);

export const addTransaction = (transaction) =>
  axios.post(API_URL, transaction);

export const updateTransaction = (id, transaction) =>
  axios.put(`${API_URL}/${id}`, transaction);

export const deleteTransaction = (id) =>
  axios.delete(`${API_URL}/${id}`);

export const getSummary = () =>
  axios.get(`${API_URL}/summary`);