import axios from "axios";
const token = localStorage.getItem("token");

export default axios.create({
  baseURL: "https://desafio-backend-03-dindin.pedagogico.cubos.academy/",
  headers: {
    "Content-Type": "applicantion/json",
    Authorization: "Bearer" + { token },
  },
});
