import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StudentAttendance() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const currentStudent = allStudents.find((s) => s.email === user.email);

    if (!currentStudent) return;

    const studentSubjects = currentStudent.subjects || [];
    setSubjects(studentSubjects);
    setStudents(allStudents);

    const studentAttendance = allAttendance.filter(a => a.student === user.email);
    setAttendance(studentAttendance);
  }, [user.email]);

  // Prepare data for chart
  const chartData = {
    labels: subjects,
    datasets: [
      {
        label: "Attendance",
        data: subjects.map(subject => {
          const records = attendance.filter(a => a.subject === subject);
          const presentCount = records.filter(r => r.status === "Present").length;
          const total = records.length;
          return total ? Math.round((presentCount / total) * 100) : 0;
        }),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Attendance Percentage by Subject",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + "%";
          }
        }
      }
    }
  };

  return (
    <div className="attendance-container">
      <h1>Hello, {user.name}</h1>
      <h2>Subject-wise Attendance</h2>
      {subjects.length === 0 ? (
        <p>No subjects assigned yet.</p>
      ) : (
        <div className="chart-wrapper">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      <style>{`
        .attendance-container {
          padding: 30px;
          font-family: Arial, sans-serif;
          max-width: 900px;
          margin: auto;
        }

        .attendance-container h1 {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .attendance-container h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .chart-wrapper {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
