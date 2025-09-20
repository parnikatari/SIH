import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Attendance = () => {
  const [courses, setCourses] = useState(["Math", "Physics"]);
  const [attendanceData, setAttendanceData] = useState({
    Math: [],
    Physics: []
  });

  const addAttendance = (course) => {
    const date = new Date().toLocaleDateString();
    const count = prompt(`Enter attendance for ${course} on ${date}`);
    if (count) {
      const courseData = attendanceData[course] || [];
      setAttendanceData({
        ...attendanceData,
        [course]: [...courseData, { date, count: parseInt(count) }]
      });
    }
  };

  const graphData = [];
  courses.forEach(course => {
    const data = attendanceData[course] || [];
    data.forEach(item => {
      const existing = graphData.find(d => d.date === item.date);
      if (existing) {
        existing[course] = item.count;
      } else {
        graphData.push({ date: item.date, [course]: item.count });
      }
    });
  });

  return (
    <>
      <div className="attendance-container">
        <h1>Attendance</h1>
        {courses.map(course => (
          <div key={course} className="course-row">
            <span className="course-name">{course}</span>
            <button onClick={() => addAttendance(course)} className="attendance-btn">Add Attendance</button>
          </div>
        ))}

        <h2>Attendance Graph</h2>
        <div className="chart-wrapper">
          <LineChart
            width={800}
            height={400}
            data={graphData.sort((a,b) => new Date(a.date) - new Date(b.date))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {courses.map((course, index) => (
              <Line key={course} type="monotone" dataKey={course} stroke={`hsl(${index * 60}, 70%, 50%)`} />
            ))}
          </LineChart>
        </div>
      </div>

      <style>{`
        .attendance-container {
          max-width: 900px;
          margin: 30px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        h1 {
          font-size: 1.8rem;
          color: #2575fc;
          margin-bottom: 20px;
        }

        .course-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .course-name {
          font-size: 1.1rem;
          font-weight: bold;
          color: #333;
        }

        .attendance-btn {
          padding: 8px 15px;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .attendance-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        h2 {
          margin-top: 25px;
          color: #2575fc;
        }

        .chart-wrapper {
          overflow-x: auto;
          margin-top: 15px;
        }
      `}</style>
    </>
  );
};

export default Attendance;
