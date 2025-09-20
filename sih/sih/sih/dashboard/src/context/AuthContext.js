import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]); 
  // Example: [{ name: "John", role: "student", email: "abc@x.com", password: "123" }]
  const [user, setUser] = useState(null);

  const register = (name, email, password, role) => {
    const exists = users.find((u) => u.email === email);
    if (exists) return false;

    setUsers([...users, { name, email, password, role }]);
    return true;
  };

  const login = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
