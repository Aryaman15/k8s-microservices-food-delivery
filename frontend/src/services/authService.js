import axios from "axios";

const AUTH_BASE = import.meta.env.VITE_AUTH_URL + "/api/users";

export const signupUser = async (data) => {
  const res = await axios.post(`${AUTH_BASE}/signup`, data);
  saveAuthToLocal(res.data);
  return res;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${AUTH_BASE}/login`, data);
  saveAuthToLocal(res.data);
  return res;
};

const saveAuthToLocal = (userData) => {
  localStorage.setItem("token", userData.token);
  localStorage.setItem("userId", userData._id);
  localStorage.setItem("role", userData.role);
  localStorage.setItem("name", userData.name);
};
