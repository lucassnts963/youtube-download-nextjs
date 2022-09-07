import axios from "axios";

const baseURL = "http://144.22.175.136:3001";

export const api = axios.create({
  baseURL,
});
