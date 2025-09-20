import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function StudentCourses() {
  const { user } = useAuth();
  const [studentCourses, setStudentCourses] = useState([]);

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const allCourses = JSON.parse(localStorage.getItem("courses")) || [];

    // Find current student
    const currentStudent = allStudents.find(s => s.email === user.email);
    if (!currentStudent) return;

    // Filter courses assigned to student
    const courses = allCourses.filter(course => currentStudent.courses.includes(course.name));
    setStudentCourses(courses);
  }, [user.email]);

  return (
    <div className="courses-container">
      <h1>Hello, {user.name}</h1>
      <h2>Your Courses & Subjects</h2>

      {studentCourses.length === 0 ? (
        <p>You have not been assigned any courses yet.</p>
      ) : (
        <div className="course-list">
          {studentCourses.map((course, idx) => (
            <div key={idx} className="course-box">
              <h3>{course.name}</h3>
              {course.subjects && course.subjects.length > 0 ? (
                <ul>
                  {course.subjects.map((subject, sidx) => (
                    <li key={sidx}>{subject}</li>
                  ))}
                </ul>
              ) : (
                <p>No subjects assigned yet.</p>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .courses-container {
          padding: 30px;
          font-family: Arial, sans-serif;
          max-width: 900px;
          margin: auto;
        }

        .courses-container h1 {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .courses-container h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .course-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .course-box {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          flex: 1 1 250px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .course-box h3 {
          margin-top: 0;
          margin-bottom: 10px;
        }

        .course-box ul {
          list-style: disc inside;
          margin: 0;
          padding: 0;
        }

        .course-box li {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
}
