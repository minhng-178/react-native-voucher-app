import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Loader } from '../../components';
import { Platform } from 'react-native';

function TabBarIcon(props) {
  var name = props.name;
  var color = props.color;
  return React.createElement(FontAwesome, {
    size: 20,
    style: { marginBottom: -3 },
    name: name,
    color: color,
  });
}

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />

        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />

        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="dashboard" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </>
  );
};

export default TabLayout;
