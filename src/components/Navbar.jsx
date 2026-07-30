import "./Navbar.css";

function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">
      <button className="navbar-menu-btn" onClick={onMenuClick}>
        ☰
      </button>
      <h1 className="navbar-title">Student Management System</h1>
      <nav className="navbar-links">
        <a href="/">Dashboard</a>
        <a href="/students">Students</a>
        <a href="/students/add">Add Student</a>
      </nav>
    </header>
  );
}

export default Navbar;