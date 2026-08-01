import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./AddStudent.css";

function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (Number(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course is required";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSubmitting(true);

    api
      .post("/students", {
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        course: formData.course,
      })
      .then(() => {
        setFormData({ name: "", email: "", age: "", course: "" });
        navigate("/students");
      })
      .catch((err) => {
        console.error(err);
        setSubmitError("Failed to add student. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} className="add-student-form" noValidate>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span className="field-error">{errors.age}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="course">Course</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
          />
          {errors.course && <span className="field-error">{errors.course}</span>}
        </div>

        {submitError && <span className="field-error">{submitError}</span>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default AddStudent;