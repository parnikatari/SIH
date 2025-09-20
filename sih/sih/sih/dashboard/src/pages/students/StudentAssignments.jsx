import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const StudentAssignments = () => {
  const { user } = useAuth(); // Logged-in student
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [solutionMap, setSolutionMap] = useState({}); // Assignment ID -> solution text

  useEffect(() => {
    const allAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const currentStudent = allStudents.find((s) => s.email === user.email);
    const studentSubjects = currentStudent?.subjects || [];

    // Ensure each assignment has a submissions array
    const assignmentsWithSubmissions = allAssignments.map((a) => ({
      ...a,
      submissions: a.submissions || []
    }));

    setAssignments(assignmentsWithSubmissions);
    setStudents(allStudents);
    setSubjects(studentSubjects);
  }, [user.email]);

  const handleChangeSolution = (assignmentId, value) => {
    setSolutionMap((prev) => ({ ...prev, [assignmentId]: value }));
  };

  const submitSolution = (assignmentId) => {
    const currentSolution = solutionMap[assignmentId]?.trim();
    if (!currentSolution) return alert("Please enter a solution.");

    const updatedAssignments = assignments.map((a) => {
      if (a.id === assignmentId) {
        const alreadySubmitted = a.submissions.find(s => s.studentEmail === user.email);
        if (alreadySubmitted) {
          alert("You have already submitted!");
          return a;
        }
        return {
          ...a,
          submissions: [...a.submissions, { studentEmail: user.email, solution: currentSolution }],
        };
      }
      return a;
    });

    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
    setSolutionMap(prev => ({ ...prev, [assignmentId]: "" }));
    alert("Solution submitted!");
  };

  const currentStudent = students.find(s => s.email === user.email);
  const studentClass = currentStudent?.class || "";

  // Filter assignments relevant to this student's class and subjects
  const classAssignments = assignments.filter(
    (a) => a.class === studentClass && subjects.includes(a.subject)
  );

  return (
    <div className="student-assignments">
      <h1>Assignments for {studentClass}</h1>
      {classAssignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        classAssignments.map((a) => (
          <div key={a.id} className="assignment-box">
            <h3>{a.title}</h3>
            <p><strong>Subject:</strong> {a.subject}</p>
            <p>{a.description || "No description"}</p>
            <input
              type="text"
              placeholder="Enter your solution"
              value={solutionMap[a.id] || ""}
              onChange={(e) => handleChangeSolution(a.id, e.target.value)}
            />
            <button onClick={() => submitSolution(a.id)}>Submit</button>

            <div className="submitted">
              <h4>Submissions:</h4>
              {a.submissions.length ? (
                <ul>
                  {a.submissions.map((s, idx) => (
                    <li key={idx}>
                      <strong>{s.studentEmail === user.email ? "You" : s.studentEmail}</strong>: {s.solution}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No submissions yet.</p>
              )}
            </div>
          </div>
        ))
      )}

      <style>{`
        .student-assignments {
          padding: 20px;
          font-family: Arial, sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: white;
        }

        .student-assignments h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #ff9800;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.4);
        }

        .assignment-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          backdrop-filter: blur(6px);
        }

        .assignment-box h3 {
          margin: 0 0 5px 0;
          color: #ff9800;
        }

        .assignment-box p {
          margin: 5px 0;
          color: #f0f0f0;
        }

        .assignment-box input {
          width: 70%;
          padding: 8px;
          margin-top: 10px;
          margin-right: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .assignment-box button {
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          background: #ff9800;
          color: white;
          cursor: pointer;
          transition: background 0.3s;
        }

        .assignment-box button:hover {
          background: #e68900;
        }

        .submitted {
          margin-top: 10px;
          font-size: 14px;
        }

        .submitted h4 {
          color: #ff9800;
        }

        .submitted ul {
          list-style: none;
          padding-left: 15px;
        }

        .submitted li {
          margin: 4px 0;
        }
      `}</style>
    </div>
  );
};

export default StudentAssignments;
