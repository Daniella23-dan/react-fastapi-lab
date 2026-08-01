import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import "./AddStudent.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    api
      .get(`/students/${id}`)
      .then((response) => {
        const { name, email, age, course } = response.data;
        setFormData({ name, email, age: String(age), course });
        setLoadError(null);
      })
      .catch((err) => {
        console.error(err);
        setLoadError("Failed to load student data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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
    setSubmitting(true);

    api
      .put(`/students/${id}`, {
        id: Number(id),
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        course: formData.course,
      })
      .then(() => {
        toast.success("Student updated successfully");
        navigate("/students");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update student");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  if (loading) {
    return <p>Loading student...</p>;
  }

  if (loadError) {
    return <p className="field-error">{loadError}</p>;
  }

  return (
    <div>
      <h2>Edit Student</h2>
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

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditStudent;