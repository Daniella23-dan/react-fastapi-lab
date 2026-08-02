import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import "./AddStudent.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    api
      .post("/auth/login", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        toast.success("Logged in successfully");
        navigate("/students");
      })
      .catch((err) => {
        console.error(err);
        setError("Incorrect username or password");
        toast.error("Login failed");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="add-student-form" noValidate>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <span className="field-error">{error}</span>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;