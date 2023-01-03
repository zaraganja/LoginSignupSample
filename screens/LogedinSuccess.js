import React from "react";
import { View, Text } from "react-native";


const LogedinSuccess = (props) => {
    return (
        <View style={{ backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center' ,flex:1}}>
            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", fontSize: 18, fontWeight: 'bold' }}>
                You Loged in successfully!
            </Text>
        </View>
    )
}

export { LogedinSuccess };