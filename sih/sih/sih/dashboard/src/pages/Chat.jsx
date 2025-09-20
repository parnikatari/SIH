import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const { teacherEmail } = useParams(); // other user email
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const other = allUsers.find(u => u.email === teacherEmail);
    setOtherUser(other || {});

    // Load chat from localStorage
    const chatKey = getChatKey(user.email, teacherEmail);
    const savedMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
    setMessages(savedMessages);
  }, [teacherEmail, user.email]);

  const getChatKey = (email1, email2) => {
    return [email1, email2].sort().join("-");
  };

  const handleSend = () => {
    if (!newMessage) return;
    const chatKey = getChatKey(user.email, teacherEmail);
    const updatedMessages = [...messages, { sender: user.name, text: newMessage, time: new Date() }];
    setMessages(updatedMessages);
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat with {otherUser.name || teacherEmail}</h2>
      <div style={{ minHeight: "300px", border: "1px solid #ccc", padding: "10px", marginBottom: "10px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === user.name ? "right" : "left", margin: "5px 0" }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ width: "80%", padding: "8px" }}
      />
      <button onClick={handleSend} style={{ padding: "8px 12px", marginLeft: "5px" }}>Send</button>
    </div>
  );
};

export default Chat;
