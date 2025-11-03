import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", enrollment: "", course: "" });

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = async () => {
    try {
      const res = await axios.post("/students", form);
      setStudents([...students, res.data]);
      setForm({ name: "", enrollment: "", course: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (enrollment) => {
    try {
      await axios.delete(`/students/${enrollment}`);
      setStudents(students.filter(s => s.enrollment !== enrollment));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (enrollment) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;
    try {
      const res = await axios.put(`/students/${enrollment}`, { name: updatedName });
      setStudents(students.map(s => s.enrollment === enrollment ? res.data : s));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin: Manage Students</h1>

      <div className="mb-4 flex gap-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="Enrollment"
          value={form.enrollment}
          onChange={e => setForm({ ...form, enrollment: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="Course"
          value={form.course}
          onChange={e => setForm({ ...form, course: e.target.value })}
          className="p-2 border rounded"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 rounded">Add</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2">Name</th>
              <th className="border px-2">Enrollment</th>
              <th className="border px-2">Course</th>
              <th className="border px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.enrollment}>
                <td className="border px-2">{s.name}</td>
                <td className="border px-2">{s.enrollment}</td>
                <td className="border px-2">{s.course}</td>
                <td className="border px-2 flex gap-2">
                  <button onClick={() => handleEdit(s.enrollment)} className="bg-blue-500 text-white px-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(s.enrollment)} className="bg-red-500 text-white px-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
