import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const loggedInUser = login(email, password);
    if (!loggedInUser) {
      setError("Invalid email or password");
      return;
    }

    if (loggedInUser.role === "teacher") navigate("/teacher-dashboard");
    else navigate("/student-dashboard");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Login</h1>

          {error && <p className="error-text">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} className="login-button">
            Login
          </button>

          <p className="register-text">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          font-family: Arial, sans-serif;
        }

        .login-box {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          width: 360px;
          text-align: center;
        }

        .login-title {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .error-text {
          color: red;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .login-input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
        }

        .login-input:focus {
          border-color: #2575fc;
          outline: none;
          box-shadow: 0 0 5px rgba(37, 117, 252, 0.5);
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background: #2575fc;
          color: white;
          font-size: 1.1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .login-button:hover {
          background: #1a5ed1;
        }

        .register-text {
          margin-top: 15px;
          font-size: 0.95rem;
          color: #555;
        }

        .register-link {
          color: #2575fc;
          font-weight: bold;
          text-decoration: none;
        }

        .register-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
