import { useEffect, useState } from "react";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/students") // ✅ adjust port
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((data) => {
        // ✅ if backend sends {students: [...]}, handle both cases
        const list = Array.isArray(data) ? data : data.students || [];
        const sorted = list.sort((a, b) =>
          String(a.enrollment).localeCompare(String(b.enrollment))
        );
        setStudents(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading students...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">🎓 Student List</h1>
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
