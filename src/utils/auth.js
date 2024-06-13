import api from "./api";
const baseUrl = "http://localhost:3001";

// Sign Up
const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(api.handleResponse);
};

// Sign In
const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(api.handleResponse);
};

// Check token
const checkToken = (jwt) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(api.handleResponse);
};

// Edit user profile
const updateUser = ({ name, avatar }) => {
  const jwt = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(api.handleResponse);
};

const auth = {
  register,
  login,
  checkToken,
  updateUser,
};

export default auth;
