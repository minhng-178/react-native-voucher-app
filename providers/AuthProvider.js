import { router } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

import { getUser } from '../api/user';
import { getRoles } from '../api/role';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const toast = useToast();

  const [user, setUser] = useState(null);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const updateAuth = async userData => {
    setUser(userData);
    setIsLogged(true);
    checkUserRole(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    toast.show('Logged In Successfully!', { type: 'success' });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setIsLogged(false);
    router.push('/');
    toast.show('Logged out!', { type: 'success' });
  };

  const checkUserRole = user => {
    if (!user) return;

    if (user.role === 'host') {
      setIsHost(true);
    } else if (user.role === 'customer') {
      setIsCustomer(true);
    }
  };

  useEffect(() => {
    const loadAuthData = async () => {
      const storedUser = await AsyncStorage.getItem('user');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLogged(true);
      }
    };
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        isCustomer,
        isHost,
        updateAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
