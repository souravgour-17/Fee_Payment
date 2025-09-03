import { useEffect, useState } from "react";
import api from "../api/axios"; // ✅ use your axios instance

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // ✅ Using axios instead of fetch
        const res = await api.get("/students");
        const data = res.data;

        const studentList = Array.isArray(data) ? data : data.students || [];

        // Sort ascending by enrollment
        studentList.sort((a, b) =>
          String(a.enrollment).localeCompare(String(b.enrollment))
        );

        setStudents(studentList);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <div className="p-6">Loading students...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-white 2xl font-bold mb-4">🎓 Student List</h1>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul className="space-y-3">
          {students.map((student) => (
            <li
              key={student.enrollment}
              className="p-4 border rounded-lg bg-white shadow"
            >
              <strong>{student.name}</strong> ({student.enrollment}) <br />
              {student.course} - {student.year} <br />
              <span className="font-semibold">
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
