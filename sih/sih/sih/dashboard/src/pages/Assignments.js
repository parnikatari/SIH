import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Assignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddAssignment = () => {
    if (!title.trim() || !description.trim()) return;
    const newAssignment = {
      id: Date.now(),
      title,
      description,
      createdBy: user?.role,
      createdAt: new Date().toLocaleString(),
    };
    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className="assignments-container">
        <h2 className="assignments-header">📖 Assignments</h2>

        {/* If teacher → Add assignment form */}
        {user?.role === "teacher" && (
          <div className="assignment-form">
            <h3>Create New Assignment</h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="assignment-input"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="assignment-textarea"
            />
            <button onClick={handleAddAssignment} className="assignment-btn">
              ➕ Add Assignment
            </button>
          </div>
        )}

        {/* Assignment List */}
        <ul className="assignment-list">
          {assignments.length === 0 ? (
            <p className="no-assignments">No assignments yet.</p>
          ) : (
            assignments.map((a) => (
              <li key={a.id} className="assignment-item">
                <h4>{a.title}</h4>
                <p>{a.description}</p>
                <small>
                  Created by: {a.createdBy} on {a.createdAt}
                </small>
              </li>
            ))
          )}
        </ul>
      </div>

      <style>{`
        .assignments-container {
          padding: 20px;
          font-family: Arial, sans-serif;
          max-width: 700px;
          margin: 0 auto;
        }

        .assignments-header {
          font-size: 1.8rem;
          color: #2575fc;
          margin-bottom: 20px;
        }

        .assignment-form {
          margin-bottom: 20px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .assignment-form h3 {
          margin-bottom: 12px;
          color: #333;
        }

        .assignment-input,
        .assignment-textarea {
          display: block;
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .assignment-input:focus,
        .assignment-textarea:focus {
          border-color: #2575fc;
          box-shadow: 0 0 8px rgba(37,117,252,0.2);
        }

        .assignment-btn {
          padding: 10px 18px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: #fff;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .assignment-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        .assignment-list {
          list-style: none;
          padding: 0;
        }

        .assignment-item {
          border: 1px solid #ccc;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 10px;
          background: #f9f9f9;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .assignment-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
        }

        .no-assignments {
          color: #888;
          font-style: italic;
        }
      `}</style>
    </>
  );
};

export default Assignments;
