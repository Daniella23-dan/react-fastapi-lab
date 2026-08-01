import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import "./StudentList.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    setDeletingId(id);
    api
      .delete(`/students/${id}`)
      .then(() => {
        setStudents((prev) => prev.filter((s) => s.id !== id));
        toast.success("Student deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete student");
      })
      .finally(() => {
        setDeletingId(null);
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
            <th>Actions</th>
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
              <td className="actions-cell">
                <Link to={`/students/edit/${student.id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(student.id)}
                  disabled={deletingId === student.id}
                  className="delete-btn"
                >
                  {deletingId === student.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;