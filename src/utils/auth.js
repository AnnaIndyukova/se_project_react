import api from "./api";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.newhopes.info"
    : "http://localhost:3001";

// Sign Up
const register = ({ name, avatar, email, password }) => {
  return api.request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

// Sign In
const login = ({ email, password }) => {
  return api.request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

// Check token
const checkToken = (jwt) => {
  return api.request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
};

// Edit user profile
const updateUser = ({ name, avatar }) => {
  const jwt = localStorage.getItem("jwt");
  return api.request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

const auth = {
  register,
  login,
  checkToken,
  updateUser,
};

export default auth;
