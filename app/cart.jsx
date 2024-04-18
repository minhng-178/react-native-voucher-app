import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, Platform } from 'react-native'

const Cart = () => {
    return (
        <View>
            <Text>Cart</Text>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    )
}

export default Cart