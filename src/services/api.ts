import axios from "axios";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://desafio-backend-03-dindin.pedagogico.cubos.academy",
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer { token }` : "",
  },
});


export const getItem = (key: string) => {
  const value = localStorage.getItem(key);

  return value
};


export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};


export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default api;
