import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    course: "",
    year: "",
    feesDue: "",
    upiid: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Fetch students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students
  useEffect(() => {
    const filtered = students.filter(
      (s) =>
        s.enrollment?.toLowerCase().includes(search.toLowerCase()) ||
        s.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [search, students]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/students");
      setStudents(res.data);
      setFilteredStudents(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (student) => {
    setEditingStudent(student.enrollment);
    setFormData({
      name: student.name,
      enrollment: student.enrollment,
      course: student.course,
      year: student.year,
      feesDue: student.feesDue,
      upiid: student.upiid,
    });
  };

  // Delete (by enrollment)
  const handleDelete = async (enrollment) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/students/${enrollment}`);
      fetchStudents();
      setSelectedStudents(selectedStudents.filter((e) => e !== enrollment));
    } catch (err) {
      console.error(err);
      setError("Failed to delete student.");
    }
  };

  // Bulk delete (by enrollment array)
  const handleBulkDelete = async () => {
    if (selectedStudents.length === 0) return;
    if (!window.confirm("Are you sure you want to delete selected students?")) return;
    try {
      await api.post("/students/bulk-delete", { enrollments: selectedStudents });
      setSelectedStudents([]);
      fetchStudents();
    } catch (err) {
      console.error(err);
      setError("Failed to delete selected students.");
    }
  };

  const handleCheckboxChange = (enrollment) => {
    if (selectedStudents.includes(enrollment)) {
      setSelectedStudents(selectedStudents.filter((e) => e !== enrollment));
    } else {
      setSelectedStudents([...selectedStudents, enrollment]);
    }
  };

  // Add or Update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingStudent) {
        await api.put(`/students/${editingStudent}`, formData);
        setEditingStudent(null);
      } else {
        await api.post("/students", formData);
      }
      setFormData({
        name: "",
        enrollment: "",
        course: "",
        year: "",
        feesDue: "",
        upiid: "",
      });
      fetchStudents();
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to save student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen py-10 space-y-6 bg-gray-900">
      <motion.div
        className="backdrop-blur-md bg-white/20 rounded-2xl shadow-xl p-8 w-full max-w-5xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold italic text-white">
          Welcome, {user?.name || "Admin"} 👋
        </h1>
        <p className="text-white/80 text-lg sm:text-xl">
          Admin Dashboard – Manage students, verify payments, generate reports
        </p>
      </motion.div>

      {/* Search */}
      <div className="w-full max-w-5xl flex gap-2">
        <input
          type="text"
          placeholder="Search by Enrollment or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-5xl flex flex-col gap-2 bg-black/20 p-4 rounded"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 rounded bg-black/10 text-white focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Enrollment"
            value={formData.enrollment}
            onChange={(e) => setFormData({ ...formData, enrollment: e.target.value })}
            className="p-2 rounded bg-black/10 text-white focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Course"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="p-2 rounded bg-black/10 text-white focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="p-2 rounded bg-black/10 text-white focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Fees Due"
            value={formData.feesDue}
            onChange={(e) => setFormData({ ...formData, feesDue: e.target.value })}
            className="p-2 rounded bg-black/10 text-white focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="UPI ID"
            value={formData.upiid}
            onChange={(e) => setFormData({ ...formData, upiid: e.target.value })}
            className="p-2 rounded bg-black/10 text-white focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </form>

      {error && <p className="text-red-400">{error}</p>}

      {/* Bulk Delete */}
      {selectedStudents.length > 0 && (
        <button
          onClick={handleBulkDelete}
          className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 mb-2"
        >
          Delete Selected ({selectedStudents.length})
        </button>
      )}

      {/* Table */}
      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-white border-b border-white/20">
              <th className="px-2 py-1">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedStudents(
                      e.target.checked ? filteredStudents.map((s) => s.enrollment) : []
                    )
                  }
                  checked={
                    selectedStudents.length === filteredStudents.length &&
                    filteredStudents.length > 0
                  }
                />
              </th>
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">Enrollment</th>
              <th className="px-2 py-1">Course</th>
              <th className="px-2 py-1">Year</th>
              <th className="px-2 py-1">Fees Due</th>
              <th className="px-2 py-1">UPI ID</th>
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.enrollment} className="text-white border-b border-white/10">
                <td className="px-2 py-1">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(s.enrollment)}
                    onChange={() => handleCheckboxChange(s.enrollment)}
                  />
                </td>
                <td className="px-2 py-1">{s.name}</td>
                <td className="px-2 py-1">{s.enrollment}</td>
                <td className="px-2 py-1">{s.course}</td>
                <td className="px-2 py-1">{s.year}</td>
                <td className="px-2 py-1">{s.feesDue}</td>
                <td className="px-2 py-1">{s.upiid}</td>
                <td className="px-2 py-1 flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.enrollment)}
                    className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-400 py-2">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
