import React, { useState } from "react";

const TeacherAssignments = ({ classes = [] }) => {
  const [assignments, setAssignments] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const addAssignment = () => {
    if (!selectedClass || !title) {
      alert("Please select class and enter a title!");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      class: selectedClass,
      title,
      description,
      submissions: [], // { studentName, solution }
    };

    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="teacher-assignments-container">
      <style>{`
        .teacher-assignments-container {
          padding: 20px;
          font-family: Arial, sans-serif;
          background: #f4f6f9;
          min-height: 100vh;
        }

        h1 {
          text-align: center;
          color: #2c3e50;
        }

        .form-section {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .form-section select,
        .form-section input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
          flex: 1;
        }

        .form-section button {
          background: #3498db;
          color: white;
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .form-section button:hover {
          background: #2980b9;
        }

        .assignment-list {
          list-style: none;
          padding: 0;
        }

        .assignment-list li {
          background: white;
          margin-bottom: 10px;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .assignment-list strong {
          font-size: 16px;
          color: #34495e;
        }

        .assignment-list button {
          margin-left: 10px;
          background: #27ae60;
          color: white;
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .assignment-list button:hover {
          background: #1e8449;
        }

        .submissions-box {
          margin-top: 20px;
          padding: 15px;
          background: #ecf0f1;
          border-radius: 8px;
        }

        .submissions-box h3 {
          margin-top: 0;
        }

        .submissions-box ul {
          list-style: none;
          padding: 0;
        }

        .submissions-box li {
          padding: 5px 0;
          border-bottom: 1px solid #bdc3c7;
        }
      `}</style>

      <h1>Teacher Assignments</h1>

      <div className="form-section">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
        <input
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addAssignment}>Add Assignment</button>
      </div>

      <h2>All Assignments</h2>
      <ul className="assignment-list">
        {assignments.map((a) => (
          <li key={a.id}>
            <strong>{a.title}</strong> <br />
            <small>Class: {a.class}</small> <br />
            <em>{a.description}</em> <br />
            <button onClick={() => setSelectedAssignment(a)}>
              View Submissions
            </button>
          </li>
        ))}
      </ul>

      {selectedAssignment && (
        <div className="submissions-box">
          <h3>Submissions for: {selectedAssignment.title}</h3>
          {selectedAssignment.submissions.length > 0 ? (
            <ul>
              {selectedAssignment.submissions.map((s, idx) => (
                <li key={idx}>
                  <strong>{s.studentName}</strong>: {s.solution}
                </li>
              ))}
            </ul>
          ) : (
            <p>No submissions yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;
