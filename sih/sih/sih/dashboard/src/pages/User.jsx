import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get all users from localStorage or mock
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    // If current user is student, show only teachers
    if (user.role === "student") {
      setUsers(allUsers.filter(u => u.role === "teacher"));
    } else if (user.role === "teacher") {
      // If teacher, show only students
      setUsers(allUsers.filter(u => u.role === "student"));
    }
  }, [user]);

  const handleChat = (otherUser) => {
    navigate(`/chat/${otherUser.email}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Users</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map(u => (
          <li
            key={u.email}
            style={{
              padding: "10px",
              margin: "5px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={() => handleChat(u)}
          >
            {u.name} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
