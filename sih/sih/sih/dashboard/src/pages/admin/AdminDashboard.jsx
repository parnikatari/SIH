import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [admins, setAdmins] = useState(
    JSON.parse(localStorage.getItem("admins")) || []
  );
  const [courses, setCourses] = useState(
    JSON.parse(localStorage.getItem("courses")) || []
  );
  const [teachers, setTeachers] = useState(
    JSON.parse(localStorage.getItem("teachers")) || []
  );

  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const [newCourseName, setNewCourseName] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [selectedTeacherEmail, setSelectedTeacherEmail] = useState("");

  // Add new admin
  const addAdmin = () => {
    if (!newAdminName || !newAdminEmail) return;
    const newAdmin = { id: Date.now(), name: newAdminName, email: newAdminEmail };
    const updated = [...admins, newAdmin];
    setAdmins(updated);
    localStorage.setItem("admins", JSON.stringify(updated));
    setNewAdminName("");
    setNewAdminEmail("");
  };

  // Add new course
  const addCourse = () => {
    if (!newCourseName) return;
    const newCourse = { id: Date.now(), name: newCourseName, subjects: [] };
    const updated = [...courses, newCourse];
    setCourses(updated);
    localStorage.setItem("courses", JSON.stringify(updated));
    setNewCourseName("");
  };

  // Add subject to course
  const addSubject = () => {
    if (!newSubjectName || !selectedCourseId) return;
    const updated = courses.map((c) => {
      if (c.id === parseInt(selectedCourseId)) {
        return { ...c, subjects: [...c.subjects, newSubjectName] };
      }
      return c;
    });
    setCourses(updated);
    localStorage.setItem("courses", JSON.stringify(updated));
    setNewSubjectName("");
    setSelectedCourseId("");
  };

  // Assign teacher to subject
  const assignTeacher = () => {
    if (!selectedTeacherEmail || !selectedCourseId || !newSubjectName) return;

    const updatedTeachers = teachers.map((t) => {
      if (t.email === selectedTeacherEmail) {
        return {
          ...t,
          subjects: [...(t.subjects || []), newSubjectName],
        };
      }
      return t;
    });

    setTeachers(updatedTeachers);
    localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
    setSelectedTeacherEmail("");
    setNewSubjectName("");
    setSelectedCourseId("");
  };

  useEffect(() => {
    // Initialize dummy teachers if none
    if (teachers.length === 0) {
      const dummyTeachers = [
        { id: 1, name: "Mr. Smith", email: "smith@school.com", subjects: [] },
        { id: 2, name: "Mrs. Jones", email: "jones@school.com", subjects: [] },
      ];
      setTeachers(dummyTeachers);
      localStorage.setItem("teachers", JSON.stringify(dummyTeachers));
    }
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Create Admin */}
      <section>
        <h2>Create Admin</h2>
        <input
          type="text"
          placeholder="Admin Name"
          value={newAdminName}
          onChange={(e) => setNewAdminName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Admin Email"
          value={newAdminEmail}
          onChange={(e) => setNewAdminEmail(e.target.value)}
        />
        <button onClick={addAdmin}>Add Admin</button>

        <ul>
          {admins.map((a) => (
            <li key={a.id}>
              {a.name} ({a.email})
            </li>
          ))}
        </ul>
      </section>

      <hr />

      {/* Create Courses */}
      <section>
        <h2>Create Course</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
        />
        <button onClick={addCourse}>Add Course</button>

        <ul>
          {courses.map((c) => (
            <li key={c.id}>
              {c.name} - Subjects: {c.subjects.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      <hr />

      {/* Add Subject to Course */}
      <section>
        <h2>Add Subject to Course</h2>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subject Name"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
        />
        <button onClick={addSubject}>Add Subject</button>
      </section>

      <hr />

      {/* Assign Teacher */}
      <section>
        <h2>Assign Teacher to Subject</h2>
        <select
          value={selectedTeacherEmail}
          onChange={(e) => setSelectedTeacherEmail(e.target.value)}
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.email}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subject Name"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
        />

        <button onClick={assignTeacher}>Assign</button>

        <ul>
          {teachers.map((t) => (
            <li key={t.id}>
              {t.name} - Subjects: {(t.subjects || []).join(", ")}
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ Inline CSS */}
      <style>{`
        .admin-dashboard {
          padding: 2rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: #f5f7fa;
          min-height: 100vh;
          color: #333;
        }

        .admin-dashboard h1 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 2rem;
        }

        .admin-dashboard section {
          background: #fff;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .admin-dashboard section h2 {
          margin-top: 0;
          color: #34495e;
          margin-bottom: 1rem;
        }

        .admin-dashboard input,
        .admin-dashboard select {
          padding: 0.6rem;
          margin: 0.5rem 0.5rem 0.5rem 0;
          border: 1px solid #ccc;
          border-radius: 4px;
          min-width: 200px;
        }

        .admin-dashboard button {
          padding: 0.6rem 1.2rem;
          background-color: #3498db;
          color: #fff;
          border: none;
          margin-top: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .admin-dashboard button:hover {
          background-color: #2980b9;
        }

        .admin-dashboard ul {
          list-style: none;
          padding-left: 1rem;
          margin-top: 1rem;
        }

        .admin-dashboard li {
          padding: 0.3rem 0;
          color: #555;
        }

        hr {
          margin: 2rem 0;
          border: none;
          border-top: 1px solid #ddd;
        }

        @media (max-width: 600px) {
          .admin-dashboard input,
          .admin-dashboard select {
            width: 100%;
            margin-bottom: 0.8rem;
          }

          .admin-dashboard button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
