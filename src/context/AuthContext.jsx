import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      // In a real app, you'd decode the token to get user info
      // and also verify it with your backend.
      // For now, we'll just set a placeholder user if a token exists.
      try{
        const decodedUser=jwtDecode(token)
        setUser({_id:decodedUser.userId});
       }catch(error){
        console.error("invalid token:",error)
        setUser(null)
        localStorage.removeItem('token')
       }
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