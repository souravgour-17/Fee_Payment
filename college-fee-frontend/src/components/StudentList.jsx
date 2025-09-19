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

  if (loading) 
    return <div className="p-6 text-left text-white">⏳ Loading students...</div>;
  if (error) 
    return <div className="p-6 text-left text-red-600">❌ {error}</div>;

  return (
    <div className="p-6 flex flex-col items-start">
      <h1 className="text-3xl font-bold mb-6 text-white">🎓 Student List</h1>

      {students.length === 0 ? (
        <p className="text-gray-300">No students found.</p>
      ) : (
        <ul className="space-y-4 w-full max-w-3xl">
          {students.map((s) => (
            <li 
              key={s.enrollment} 
              className="p-6 border rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg"
            >
              <span className="font-bold text-white text-lg md:text-xl">
                {s.name} ({s.enrollment})
              </span>
              <br />
              <span className="text-gray-200 text-base md:text-lg">
                {s.course} - {s.year}
              </span>
              <br />
              <span className={`font-semibold text-base md:text-lg ${
                s.feesDue > 0 ? "text-red-500" : "text-green-400"
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
