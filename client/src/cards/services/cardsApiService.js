import axios from "axios";
import { API_BASE_URL } from "../../config";
const API_BASE = `${API_BASE_URL}/cards`;

export const getAllCards = (token) => {
  if (token) {
    return axios.get(API_BASE, {
      headers: { "x-auth-token": token }
    });
  }
  return axios.get(API_BASE);
};

export const getCardById = (id) => axios.get(`${API_BASE}/${id}`);

export const toggleCardLike = (id, token) =>
  axios.patch(`${API_BASE}/${id}`, {}, {
    headers: { "x-auth-token": token }
  });

export const updateCard = (id, cardData, token) =>
  axios.put(`${API_BASE}/${id}`, cardData, {
    headers: { "x-auth-token": token }
  });

export const deleteCard = (id, token) =>
  axios.delete(`${API_BASE}/${id}`, {
    headers: { "x-auth-token": token }
  });

export const createCard = (cardData, token) =>
  axios.post(API_BASE, cardData, {
    headers: { "x-auth-token": token }
  });
