// src/services/studentService.js

import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

const studentService = {
  // Existing functions for CRUD operations
  getStudents: () => axios.get(API_URL),
  getStudentByEnrollment: (enrollment) =>
    axios.get(`${API_URL}/${encodeURIComponent(enrollment)}`),
  createStudent: (studentData) => axios.post(API_URL, studentData),
  updateStudent: (enrollment, studentData) =>
    axios.put(`${API_URL}/${encodeURIComponent(enrollment)}`, studentData),
  deleteStudent: (enrollment) =>
    axios.delete(`${API_URL}/${encodeURIComponent(enrollment)}`),

  // ✅ New function to get students with pending fees
  getPendingFees: () => axios.get(`${API_URL}/pending-fees`),

  // ✅ New function to get fees by department
  getFeesByDepartment: () => axios.get(`${API_URL}/fees-by-department`),
};

export default studentService;