import axios from "axios";
import { API_BASE_URL } from "../../config";
const API_BASE = `${API_BASE_URL}/users`;

/**
 * Get all users (admin only)
 */
export const getAllUsers = (token) =>
  axios.get(API_BASE, {
    headers: { "x-auth-token": token },
  });

/**
 * Update user profile (name, phone, image, address)
 */
export const updateUserProfile = (userId, userData, token) =>
  axios.put(
    `${API_BASE}/${userId}`,
    userData,
    { headers: { "x-auth-token": token } }
  );

/**
 * Update user role (business <-> regular)
 * Accepts userId and boolean isBusiness
 */
export const updateUserRole = (userId, isBusiness, token) =>
  axios.patch(
    `${API_BASE}/${userId}`,
    { isBusiness },
    { headers: { "x-auth-token": token } }
  );

/**
 * Delete a user (except admin users)
 */
export const deleteUser = (userId, token) =>
  axios.delete(`${API_BASE}/${userId}`, {
    headers: { "x-auth-token": token },
  });
