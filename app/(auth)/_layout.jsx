import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Loader from "../../components/Loader";
import { Platform } from "react-native";

const AuthLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </>
  );
};

export default AuthLayout;
