/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { getUserLogin, setUserLogin } from '../data/user_login'

const defaultValue = {
  user: null,
  isLoading: false,
  setUser: (value) => null,
  logout: () => null,
};

const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const _user = await getUserLogin()
      if (_user) {
        setUser(_user);
      }
      setIsLoading(false);
    })()
  }, []);

  const handleLogout = () => {
    setUser(null);
    //localStorage.clear();
  };

  useEffect(() => {
    (async () => setUserLogin(user))()
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
