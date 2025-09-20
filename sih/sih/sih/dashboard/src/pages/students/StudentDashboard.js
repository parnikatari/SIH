import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth(); // get student info
  const [meetingLink, setMeetingLink] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const handleJoin = () => {
    if (meetingLink.trim()) {
      window.open(meetingLink, '_blank');
    } else {
      alert('Please enter a meeting link.');
    }
  };

  useEffect(() => {
    // load student subjects, assignments and attendance from localStorage
    const allAssignments = JSON.parse(localStorage.getItem('assignments')) || [];
    const allAttendance = JSON.parse(localStorage.getItem('attendance')) || [];
    const students = JSON.parse(localStorage.getItem('students')) || [];

    const currentStudent = students.find(s => s.email === user.email);
    const studentSubjects = currentStudent?.subjects || [];

    const studentAssignments = allAssignments.filter(a => studentSubjects.includes(a.subject) && a.class === currentStudent.class);
    const studentAttendance = allAttendance.filter(a => a.student === user.email);

    setSubjects(studentSubjects);
    setAssignments(studentAssignments);
    setAttendance(studentAttendance);
  }, [user.email]);

  // helper to calculate attendance per subject
  const getAttendanceStatus = (subject) => {
    const records = attendance.filter(a => a.subject === subject);
    const presentCount = records.filter(r => r.status === 'Present').length;
    const total = records.length;
    return total ? `${presentCount}/${total} Present` : 'No records';
  };

  return (
    <>
      <div className="student-container">
        <h1>Hello, {user.name || 'Student'}!</h1>
        <p>Enter your meeting link below to join the virtual class:</p>

        <input
          type="text"
          placeholder="Paste meeting link here..."
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          className="meeting-input"
        />

        <button onClick={handleJoin} className="join-button">
          Join Meeting
        </button>

        
      </div>

      <style>{`
        .student-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 10vh;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: #fff;
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 50px;
        }

        .student-container h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .student-container p {
          font-size: 1.2rem;
          margin-bottom: 20px;
        }

        .meeting-input {
          width: 80%;
          max-width: 400px;
          padding: 12px;
          border-radius: 8px;
          border: none;
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .join-button {
          padding: 12px 24px;
          background: #ff9800;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-bottom: 30px;
        }

        .join-button:hover {
          background: #e68900;
        }

        


      `}</style>
    </>
  );
}
