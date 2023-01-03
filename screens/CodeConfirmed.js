import React,{useState} from 'react';
import {View, Text, Image, TouchableOpacity,StyleSheet,SafeAreaView,  KeyboardAvoidingView,Dimensions} from 'react-native';


const CodeConfirmed=(props)=>{
    return(
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
  
        {/* <Image source={require('../assets/images/loginic.png')} /> */}
        
        <Text allowFontScaling={false} style={{ color: '#101828', fontFamily: "Poppins-Regular", fontSize: 24, fontWeight: 'bold', marginTop: '5%' }}>Code confirmed</Text>
       

        <TouchableOpacity
            style={Styles.loginStyle}
            //onPress={() => { handleSubmit(); setanimating(true) }}
            onPress={() => props.navigation.navigate('LoginScreen')}
        >
            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", color: '#6018BB', fontWeight: '700', fontSize: 16 }}>Go on</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:'5%'}} onPress={()=> props.navigation.navigate('SignUpScreen')}>
            <Text allowFontScaling={false} style={{fontSize:14,fontWeight:'700',color:'#1163FA'}}>Back to Sign Up</Text>
        </TouchableOpacity>
        </View>
    )
}
const Styles=StyleSheet.create({
    loginStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#DFD0F1',
        padding: 6,
        width: '90%',
        height: '6%',
        borderColor: '#6018BB',
        borderWidth: 1,
        marginTop: '7%'
    },
})
export {CodeConfirmed}