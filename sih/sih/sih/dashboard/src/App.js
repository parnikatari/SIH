import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import UserList from "./pages/UserList.js";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/students/StudentDashboard.js";
import TeacherAssignments from "./pages/TeacherAssignments";
import StudentAssignments from "./pages/students/StudentAssignments.jsx";
import ViewClasses from "./pages/ViewClasses";
import Layout from "./components/Layout";
import { useState } from "react";
import StudentAttendance from "./pages/students/StudentAttendance.jsx";
import TeacherAttendance from "./pages/TeacherAttendance.jsx";
import StudentCourses from "./pages/students/StudentCourses.jsx";
import StudentCalendar from "./pages/students/StudentCalender.jsx";
import TeacherCalendar from "./pages/TeacherCalender";
import Settings from "./pages/Setting";
import { useAuth } from "./context/AuthContext";
import TeacherCourses from "./pages/TeacherCourses"; 
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
function App() {
  // Shared state
  const [classes, setClasses] = useState(["Class A", "Class B"]); // example classes
  const [assignments, setAssignments] = useState([]); // all assignments
  const [currentStudentName, setCurrentStudentName] = useState("John Doe");
  const [currentStudentClass, setCurrentStudentClass] = useState("Class A");
const ProtectedRoute = ({ children, role, redirectTo = "/login" }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to={redirectTo} />; // Not logged in
  if (role && user.role !== role) return <Navigate to={redirectTo} />; // Unauthorized

  return children;
};
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<h1>❌ Unauthorized Access</h1>} />

          {/* 🔒 Protected Routes */}

          {/* Teacher */}
          <Route
            path="/teacher-dashboard"
            element={
              <PrivateRoute role="teacher">
                <Layout>
                  <TeacherDashboard />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/teacher/view-classes"
            element={
              <PrivateRoute role="teacher">
                <Layout>
                  <ViewClasses classes={classes} classCourses={{ "Class A": ["Math"], "Class B": ["Physics"] }} />
                </Layout>
              </PrivateRoute>
            }
          />

<Route
  path="/teachercourses"
  element={
    <PrivateRoute role="teacher">
      <Layout>
        <TeacherCourses />
      </Layout>
    </PrivateRoute>
  }
/>
<Route
  path="/teacherattendance"
  element={
    <PrivateRoute role="teacher">
      <Layout>
        <TeacherAttendance />
      </Layout>
    </PrivateRoute>
  }
/>

 
          <Route
            path="/teacherassignments"
            element={
              <PrivateRoute role="teacher">
                <Layout>
                  <TeacherAssignments classes={classes} assignments={assignments} setAssignments={setAssignments} />
                </Layout>
              </PrivateRoute>
            }
          />
        <Route
          path="/teachercalendar"
          element={
            <ProtectedRoute role="teacher">
              <Layout>
              <TeacherCalendar /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacherassignments"
          element={
            <ProtectedRoute role="teacher">
              <Layout>
              <TeacherAssignments />
              </Layout>
            </ProtectedRoute>
          }
        />
          {/* Student */}
          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute role="student">
                <Layout>
                  <StudentDashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/studentattendance"
            element={
              <PrivateRoute role="student">
                <Layout>
                  <StudentAttendance />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
          path="/studentcourses"
          element={
            <ProtectedRoute role="student">
              <Layout>
              <StudentCourses /></Layout>
            </ProtectedRoute>
          }
        />
          <Route
          path="/studentcalendar"
          element={
            <ProtectedRoute role="student">
              <Layout>
              <StudentCalendar />
              </Layout>
            </ProtectedRoute>
          }
        />

          <Route
            path="/student/assignments"
            element={
              <PrivateRoute role="student">
                <Layout>
                  <StudentAssignments
                    studentName={currentStudentName}
                    studentClass={currentStudentClass}
                    assignments={assignments}
                    setAssignments={setAssignments}
                  />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Settings (both roles) */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminwebportal"
          element={
              <AdminDashboard />
          }
        />

  <Route path="/userlist" element={<Layout><UserList /></Layout>} />
  <Route path="/chat/:userName" element={<Layout><Chat /></Layout>} />

<Route
  path="/chat/:teacherEmail"
  element={
    <PrivateRoute>
      <Layout><Chat /></Layout>
    </PrivateRoute>
  }
/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
