import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------- Load user from localStorage -------- */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /* -------- FIXED LOGIN -------- */
  const login = (email, password) => {
    const FIXED_EMAIL = 'admin@test.com';
    const FIXED_PASSWORD = '1234';

    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    if (email !== FIXED_EMAIL || password !== FIXED_PASSWORD) {
      return { success: false, message: 'Invalid email or password' };
    }

    const fixedUser = {
      id: '1',
      name: 'Admin User',
      email: FIXED_EMAIL,
      avatar: '👨‍🎓',
      enrolledCourses: [1, 2],
      progress: 80
    };

    setUser(fixedUser);
    localStorage.setItem('user', JSON.stringify(fixedUser));

    return { success: true, user: fixedUser };
  };

  /* -------- REGISTER (DISABLED / MOCK) -------- */
  const register = () => {
    return {
      success: false,
      message: 'Registration is disabled. Use fixed login credentials.'
    };
  };

  /* -------- LOGOUT -------- */
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
