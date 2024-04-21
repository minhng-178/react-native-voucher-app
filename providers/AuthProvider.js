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
  const [tokens, setTokens] = useState(null);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const updateAuth = async (userData, tokenData) => {
    setUser(userData);
    setTokens(tokenData);
    setIsLogged(true);

    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('tokens', JSON.stringify(tokenData));

    await checkUserRole(userData);
    toast.show('Logged In Successfully!', { type: 'success' });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('tokens');

    setUser(null);
    setTokens(null);
    setIsLogged(false);
    router.push('/sign-in');
    toast.show('Logged out!', { type: 'success' });
  };

  const checkUserRole = async user => {
    const currentUser = await getUser(user._id);
    const roles = await getRoles();

    const userRole = roles.data.find(
      role => role._id === currentUser.data.role_id,
    );

    if (userRole) {
      switch (userRole.name) {
        case 'admin':
          // handle admin role
          break;
        case 'staff':
          // handle staff role
          break;
        case 'customer':
          setIsCustomer(true);
          break;
        case 'host':
          setIsHost(true);
          break;
        default:
          console.log('Unknown role');
      }
    } else {
      console.log('No role found for this user');
    }
  };

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
