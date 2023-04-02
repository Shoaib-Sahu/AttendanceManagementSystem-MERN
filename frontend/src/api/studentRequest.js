import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchAllStudents = () => API.get("/student/");

export const fetchStudent = (id) => API.get(`/student/${id}`);

export const addStudent = (formData) => API.post("/student/create", formData);

export const enterAttendance = (id, user) => API.put(`/student/attendance/enter/${id}`, user);

export const fetchOneAttendance = (id) => API.get(`/student/attendance/${id}`);