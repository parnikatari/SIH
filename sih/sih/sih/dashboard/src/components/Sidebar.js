import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAssignmentsClick = (e) => {
    e.preventDefault();
    if (user.role === "teacher") {
      navigate("/teacher/assignments");
    } else {
      navigate("/student/assignments");
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-title">Virtual Classroom</h2>
      <nav>
        <ul className="sidebar-links">
          <li>
            <NavLink
              to={user.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>

          {/* Teacher Routes */}
          {user.role === "teacher" && (
            <>
              <li>
                <NavLink to="/teachercourses" className={({ isActive }) => (isActive ? "active" : "")}>
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink to="/teachercalendar" className={({ isActive }) => (isActive ? "active" : "")}>
                  Calendar
                </NavLink>
                
              </li>
              <li>
                <NavLink to="/teacherassignments" className={({ isActive }) => (isActive ? "active" : "")}>
                  assignments
                </NavLink>
              </li>
              <li>
                <NavLink to="/teacherattendance" className={({ isActive }) => (isActive ? "active" : "")}>
                  attendance
                </NavLink>
              </li>
            </>
          )}

          {/* Student Routes */}
          {user.role === "student" && (
            <>
              
              <li>
                <NavLink to="/studentcourses" className={({ isActive }) => (isActive ? "active" : "")}>
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink to="/studentcalendar" className={({ isActive }) => (isActive ? "active" : "")}>
                  Calendar
                </NavLink>
              </li>
              <li>
                <NavLink to="/studentattendance" className={({ isActive }) => (isActive ? "active" : "")}>
                  Attendance
                </NavLink>
              </li>
              <li>
            <a href="/assignments" onClick={handleAssignmentsClick}>
              Assignments
            </a>
          </li>
              <li>
                
  <NavLink 
    to="/userlist" 
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    {user.role === "student" ? "Teachers" : "Students"}
  </NavLink>
</li>

            </>
          )}

          {/* Shared Assignments Link */}
          
        </ul>
      </nav>
    </div>
  );
}
