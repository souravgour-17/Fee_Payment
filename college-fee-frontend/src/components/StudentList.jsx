import { useEffect, useState } from "react";
import api from "../api/axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students");
        const list = Array.isArray(res.data) ? res.data : res.data.students || [];
        list.sort((a, b) => String(a.enrollment).localeCompare(String(b.enrollment)));
        setStudents(list);
      } catch (err) {
        console.error("❌ Error fetching students:", err);
        setError(err.response?.data?.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="p-6 text-center text-white">⏳ Loading students...</div>;
  if (error) return <div className="p-6 text-center text-red-600">❌ {error}</div>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">🎓 Student List</h1>

      {students.length === 0 ? (
        <p className="text-gray-300">No students found.</p>
      ) : (
        <ul className="space-y-3">
          {students.map((s) => (
            <li key={s.enrollment} className="p-4 md:p-6 border rounded-lg bg-white shadow">
              <span className="font-bold text-black text-sm md:text-base">
                {s.name} ({s.enrollment})
              </span>
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                {s.course} - {s.year}
              </span>
              <br />
              <span className={`font-semibold text-sm md:text-base ${
                s.feesDue > 0 ? "text-red-600" : "text-green-600"
              }`}>
                Fees Due: ₹{s.feesDue}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;
