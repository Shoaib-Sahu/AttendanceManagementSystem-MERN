import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const createLeave = (formData) => API.post("/leave/create", formData);

export const GetSingleLeaves = (id) => API.get(`/leave/${id}`);

export const getLeaves = () => API.get("/leave/");

export const leaveApproval = (id, status) => API.put(`/leave/${id}`, status);