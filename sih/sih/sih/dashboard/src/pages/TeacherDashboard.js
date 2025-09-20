import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function TeacherDashboard() {
  const { user } = useAuth(); // teacher user
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [assignmentTitle, setAssignmentTitle] = useState("");

  // Load data from localStorage
  useEffect(() => {
    setTeachers(JSON.parse(localStorage.getItem("teachers")) || []);
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
    setAssignments(JSON.parse(localStorage.getItem("assignments")) || []);
    setAttendance(JSON.parse(localStorage.getItem("attendance")) || []);
  }, []);

  // Get current teacher's assigned subjects
  const teacher = teachers.find((t) => t.email === user.email);
  const subjects = teacher?.subjects || [];

  // Get classes with students
  const classes = [...new Set(students.map((s) => s.class))];

  // Mark attendance for all students in selected class & subject
  const markAttendance = (status) => {
    const classStudents = students.filter((s) => s.class === selectedClass);
    const updatedAttendance = [...attendance];

    classStudents.forEach((s) => {
      updatedAttendance.push({
        student: s.email,
        subject: selectedSubject,
        class: selectedClass,
        date: new Date().toISOString().split("T")[0],
        status,
      });
    });

    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
    alert("Attendance marked!");
  };

  // Create assignment
  const createAssignment = () => {
    if (!assignmentTitle || !selectedSubject || !selectedClass) return;

    const newAssignment = {
      id: Date.now(),
      title: assignmentTitle,
      subject: selectedSubject,
      class: selectedClass,
      teacher: user.email,
      date: new Date().toISOString().split("T")[0],
    };

    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
    setAssignmentTitle("");
    alert("Assignment created!");
  };

  // Get students in selected class & subject
  const classStudents = students.filter(
    (s) => s.class === selectedClass && s.subjects.includes(selectedSubject)
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Teacher Dashboard</h1>
      <h2>Welcome, {user.name}</h2>

      {/* Select Subject */}
      <div>
        <label>Subject: </label>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>

        <label style={{ marginLeft: "1rem" }}>Class: </label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Mark Attendance */}
      {selectedSubject && selectedClass && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Mark Attendance</h3>
          <button onClick={() => markAttendance("Present")}>Present</button>
          <button onClick={() => markAttendance("Absent")} style={{ marginLeft: "1rem" }}>Absent</button>

          <h4>Students in {selectedClass} ({selectedSubject})</h4>
          <ul>
            {classStudents.map((s) => (
              <li key={s.email}>{s.name} ({s.email})</li>
            ))}
          </ul>
        </div>
      )}

      {/* Create Assignment */}
      {selectedSubject && selectedClass && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Create Assignment</h3>
          <input
            type="text"
            placeholder="Assignment Title"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
          />
          <button onClick={createAssignment} style={{ marginLeft: "1rem" }}>Create</button>

          <h4>Assignments for {selectedClass} ({selectedSubject})</h4>
          <ul>
            {assignments
              .filter(a => a.subject === selectedSubject && a.class === selectedClass)
              .map(a => (
                <li key={a.id}>{a.title} (Created on {a.date})</li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}
