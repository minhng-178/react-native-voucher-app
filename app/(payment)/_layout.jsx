import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Platform } from "react-native";

const AuthLayout = () => {

    return (
        <>
            <Stack>
                <Stack.Screen
                    name="payment"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="success"
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
