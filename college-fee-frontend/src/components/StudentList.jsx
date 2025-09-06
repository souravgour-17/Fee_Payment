import { useEffect, useState } from "react";
import api from "../api/axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students"); // automatically uses VITE_API_URL
        const data = res.data;
        const studentList = Array.isArray(data) ? data : data.students || [];
        studentList.sort((a, b) =>
          String(a.enrollment).localeCompare(String(b.enrollment))
        );
        setStudents(studentList);
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
  if (error) return <div className="p-6 text-center text-red-600">❌ Error: {error}</div>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">🎓 Student List</h1>

      {students.length === 0 ? (
        <p className="text-gray-300">No students found.</p>
      ) : (
        <ul className="space-y-3">
          {students.map((student) => (
            <li key={student.enrollment} className="p-4 md:p-6 border rounded-lg bg-white shadow">
              <span className="font-bold text-black text-sm md:text-base">
                {student.name} ({student.enrollment})
              </span>
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                {student.course} - {student.year}
              </span>
              <br />
              <span className={`font-semibold text-sm md:text-base ${
                student.feesDue > 0 ? "text-red-600" : "text-green-600"
              }`}>
                Fees Due: ₹{student.feesDue}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;
