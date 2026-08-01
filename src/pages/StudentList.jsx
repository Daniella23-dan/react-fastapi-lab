import { useState, useEffect } from "react";
import api from "../api";
import "./StudentList.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  function fetchStudents() {
    setLoading(true);
    api
      .get("/students")
      .then((response) => {
        setStudents(response.data);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load students. Is the API running?");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p className="field-error">{error}</p>;
  }

  return (
    <div>
      <h2>Student List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;