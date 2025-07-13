import api from "../api";

// Restaurants -------------
export const fetchRestaurants = () => api.get("/restaurants");
export const fetchRestaurant  = (id) => api.get(`/restaurants/${id}`);
export const createRestaurant = (data) => api.post("/restaurants", data);
export const updateRestaurant = (id, data) => api.put(`/restaurants/${id}`, data);

// Menu ---------------------
export const fetchMenu = (id)            => api.get(`/restaurants/${id}/menu`);
export const addMenu   = (id, menuItems) => api.post(`/restaurants/${id}/menu`, { items: menuItems });
