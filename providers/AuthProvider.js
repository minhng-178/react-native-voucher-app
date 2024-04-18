import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../api/user';
import { getRoles } from '../api/role';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const updateAuth = async (userData, tokenData) => {
    setUser(userData);
    setTokens(tokenData);
    setIsLogged(true);

    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('tokens', JSON.stringify(tokenData));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('tokens');
    setUser(null);
    setTokens(null);
    setIsLogged(false);
  };

  const checkIsCustomer = async () => {};

  useEffect(() => {
    const loadAuthData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedTokens = await AsyncStorage.getItem('tokens');
      if (storedUser && storedTokens) {
        setUser(JSON.parse(storedUser));
        setTokens(JSON.parse(storedTokens));
        setIsLogged(true);
      }
    };
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isLogged,
        updateAuth,
        logout,
        checkIsCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
