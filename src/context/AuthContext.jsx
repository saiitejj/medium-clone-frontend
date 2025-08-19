import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      // In a real app, you'd decode the token to get user info
      // and also verify it with your backend.
      // For now, we'll just set a placeholder user if a token exists.
      setUser({ isLoggedIn: true });
    } else {
      setUser(null);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};