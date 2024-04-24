import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../components/Loader';

const WelcomeScreen = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        setIsLoading(false);

        return;
      }

      const storedUser = JSON.parse(user);

      setUserRole(storedUser.role);
      setIsLoading(false);
    };

    fetchUser();
  }, []);


  if (userRole === 'host') {
    return <Redirect href="/(host)/home" />;
  } else if (userRole === 'customer') {
    return <Redirect href="/(user)/home" />;
  }

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return <Redirect href="/(user)/home" />;
};

export default WelcomeScreen;
