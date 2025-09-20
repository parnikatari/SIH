import React, { useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");

  const addCourse = () => {
    if (newCourse && !courses.includes(newCourse)) {
      setCourses([...courses, newCourse]);
      setNewCourse("");
    }
  };

  return (
    <>
      <div className="courses-container">
        <h1>Courses</h1>
        <input
          type="text"
          placeholder="Enter course name"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          className="course-input"
        />
        <button onClick={addCourse} className="course-btn">Add Course</button>

        <ul className="course-list">
          {courses.map((course, index) => (
            <li key={index} className="course-item">{course}</li>
          ))}
        </ul>
      </div>

      <style>{`
        .courses-container {
          max-width: 600px;
          margin: 30px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        h1 {
          color: #2575fc;
          margin-bottom: 20px;
          font-size: 1.8rem;
        }

        .course-input {
          width: 100%;
          padding: 10px 15px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .course-input:focus {
          border-color: #2575fc;
          box-shadow: 0 0 8px rgba(37,117,252,0.2);
        }

        .course-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .course-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        .course-list {
          list-style: none;
          padding: 0;
          margin-top: 15px;
        }

        .course-item {
          padding: 12px 15px;
          margin-bottom: 10px;
          border-radius: 10px;
          background: #fff;
          border: 1px solid #ddd;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .course-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  );
};

export default Courses;
