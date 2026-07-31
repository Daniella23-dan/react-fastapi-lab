import "./StudentList.css";

const mockStudents = [
  { id: 1, name: "Angel Dani", email: "angel@example.com", age: 20, course: "Economics" },
  { id: 2, name: "Susan Peters", email: "susan@example.com", age: 25, course: "Geography" },
  { id: 3, name: "Carine Joy", email: "carine@example.com", age: 18, course: "Physics" },
];

function StudentList() {
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
          {mockStudents.map((student) => (
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