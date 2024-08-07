import axios from "axios";

const token = localStorage.getItem("token");

const API_BASE_URL =
  "https://desafio-backend-03-dindin.pedagogico.cubos.academy";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const ENDPOINTS = {
  user: `${API_BASE_URL}/usuario`,
  login: `${API_BASE_URL}/login`,
  category: `${API_BASE_URL}/categoria`,
  transaction: `${API_BASE_URL}/transacao`,
  statement: `${API_BASE_URL}/transacao/extrato`,
};
