import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-3xl font-plight">Hello</Text>
            <StatusBar style="auto" />
            <Link href={"/profile"} >Go to profile page</Link>
        </View>
    );
}

