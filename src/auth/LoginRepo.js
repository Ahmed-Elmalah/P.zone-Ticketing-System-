// ============================================================
// LoginRepo.js
// All API calls related to authentication only.
// No app-specific calls here (no orders, no products…).
// Uses axios + the domain from environment variable.
// ============================================================

import axios from "axios";

// Base URL comes from .env file:
// REACT_APP_API_URL=http://YOUR-SERVER-IP:1337
const isProd = import.meta.env.PROD;
const domain = isProd ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:1337/api');

const LoginRepo = {

  // POST /api/auth/local
  // Login with email + password, returns { jwt, user }
  auth_login: (values) => {
    return axios.post(`${domain}/auth/local`, {
      identifier: values.email,
      password: values.password,
    });
  },

  // POST /api/auth/local/register
  // Register a new user, returns { jwt, user }
  auth_signup: (values) => {
    return axios.post(`${domain}/auth/local/register`, {
      username: values.username,
      email: values.email,
      password: values.password,
    });
  },

  // GET /api/users/me?populate=role
  // Validate JWT and return the current user's data + role
  check_token: (jwt) => {
    return axios.get(`${domain}/users/me?populate=role`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  },

  // PUT /api/users/:id
  // Update any user fields (profile data, role, branch…)
  update_user: (id, data, jwt) => {
    return axios.put(`${domain}/users/${id}`, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  },

  // POST /api/auth/change-password
  // Change password for the currently logged-in user
  change_password: (data, jwt) => {
    return axios.post(`${domain}/auth/change-password`, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  },

  // GET /api/users?populate=role
  // Fetch all users — admin only
  getAllUsers: (jwt) => {
    return axios.get(`${domain}/users?populate=role`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  },

  // GET /api/users/:id?populate=role
  // Fetch a single user by ID
  getUserById: (id, jwt) => {
    return axios.get(`${domain}/users/${id}?populate=role`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  },

  // DELETE /api/users/:id
  // Delete a user by ID — admin only
  deleteUser: (id, jwt) => {
    return axios.delete(`${domain}/users/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  },
};

export default LoginRepo;