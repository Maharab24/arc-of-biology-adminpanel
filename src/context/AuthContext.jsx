import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- Load user from localStorage ---------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /* ---------------- LOGIN ---------------- */
  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    // mock validation
    if (password.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters' };
    }

    const mockUser = {
      id: '12345',
      name: 'John Doe',
      email,
      avatar: '👨‍🎓',
      enrolledCourses: [1, 2, 3],
      progress: 65
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));

    return { success: true, user: mockUser };
  };

  /* ---------------- REGISTER ---------------- */
  const register = (name, email, password) => {
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required' };
    }

    const mockUser = {
      id: Date.now().toString(),
      name,
      email,
      avatar: '👨‍🎓',
      enrolledCourses: [],
      progress: 0
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));

    return { success: true, user: mockUser };
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
