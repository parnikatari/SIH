import { useState } from "react";

export default function TeacherAttendance({ classes = [], students = [] }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [attendance, setAttendance] = useState({}); 
  const [savedAttendance, setSavedAttendance] = useState([]); // store multiple records

  const handleMark = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const handleSave = () => {
    if (!selectedClass || !date || !time) {
      alert("Please select class, date, and time");
      return;
    }

    const record = {
      class: selectedClass,
      date,
      time,
      attendance: { ...attendance },
    };

    setSavedAttendance([...savedAttendance, record]);
    alert("Attendance saved!");
    setAttendance({});
    setSelectedClass("");
    setDate("");
    setTime("");
  };

  // filter students based on selected class
  const classStudents = students.filter((s) => s.studentClass === selectedClass);

  return (
    <div className="teacher-attendance">
      <style>{`
        .teacher-attendance { padding: 20px; font-family: Arial, sans-serif; background: #f5f7fa; min-height: 100vh; }
        .teacher-attendance h1 { text-align: center; color: #2c3e50; margin-bottom: 20px; }
        .teacher-attendance select, .teacher-attendance input { padding: 8px; margin-right: 10px; border: 1px solid #ccc; border-radius: 5px; }
        .teacher-attendance button { background: #3498db; color: #fff; padding: 8px 14px; border: none; border-radius: 5px; cursor: pointer; transition: background 0.3s ease; }
        .teacher-attendance button:hover { background: #2980b9; }
        .teacher-attendance table { margin-top: 20px; border-collapse: collapse; width: 100%; background: white; box-shadow: 0 2px 6px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
        .teacher-attendance th, .teacher-attendance td { border: 1px solid #ddd; padding: 10px; text-align: center; }
        .teacher-attendance th { background: #3498db; color: white; }
        .teacher-attendance tr:nth-child(even) { background: #f9f9f9; }
        .teacher-attendance tr:hover { background: #ecf0f1; }
        .saved-record { margin-top: 20px; padding: 10px; background: #fff; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
      `}</style>

      <h1>Teacher Attendance</h1>

      <div>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        <button onClick={handleSave}>Save Attendance</button>
      </div>

      {selectedClass && classStudents.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Present</th>
              <th>Absent</th>
            </tr>
          </thead>
          <tbody>
            {classStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>
                  <input
                    type="radio"
                    name={`att-${student.id}`}
                    checked={attendance[student.id] === "Present"}
                    onChange={() => handleMark(student.id, "Present")}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`att-${student.id}`}
                    checked={attendance[student.id] === "Absent"}
                    onChange={() => handleMark(student.id, "Absent")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedClass && classStudents.length === 0 && <p>No students found for this class.</p>}

      {/* Display saved records */}
      {savedAttendance.length > 0 && (
        <div>
          <h2>Saved Attendance Records</h2>
          {savedAttendance.map((record, index) => (
            <div key={index} className="saved-record">
              <strong>Class:</strong> {record.class} | <strong>Date:</strong> {record.date} | <strong>Time:</strong> {record.time}
              <ul>
                {Object.entries(record.attendance).map(([id, status]) => {
                  const student = students.find((s) => s.id.toString() === id);
                  return <li key={id}>{student?.name || id}: {status}</li>;
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
