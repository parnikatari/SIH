import React from "react";

const TeacherCourses = () => {
  // Example courses (you can later fetch this from backend or context)
  const courses = [
    { id: 1, name: "Mathematics", code: "MATH101", description: "Algebra, Geometry, and Trigonometry" },
    { id: 2, name: "Physics", code: "PHY201", description: "Mechanics, Optics, and Thermodynamics" },
    { id: 3, name: "Computer Science", code: "CS301", description: "Programming and Data Structures" },
  ];

  return (
    <div className="teacher-courses-container">
      <h2 className="page-title">📘 My Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.name}</h3>
            <p><strong>Code:</strong> {course.code}</p>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourses;
