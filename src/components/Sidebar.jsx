import "./Sidebar.css";

function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/students">Student List</a></li>
        <li><a href="/students/add">Add Student</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;