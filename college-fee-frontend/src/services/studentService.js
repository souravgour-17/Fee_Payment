// src/services/studentService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/students`;

const studentService = {
  getStudents: () => axios.get(API_URL),
  getStudentByEnrollment: (enrollment) =>
    axios.get(`${API_URL}/${encodeURIComponent(enrollment)}`),
  createStudent: (studentData) => axios.post(API_URL, studentData),
  updateStudent: (enrollment, studentData) =>
    axios.put(`${API_URL}/${encodeURIComponent(enrollment)}`, studentData),
  deleteStudent: (enrollment) =>
    axios.delete(`${API_URL}/${encodeURIComponent(enrollment)}`),

  getPendingFees: () => axios.get(`${API_URL}/pending-fees`),
  getFeesByDepartment: () => axios.get(`${API_URL}/fees-by-department`),
};

export default studentService;
