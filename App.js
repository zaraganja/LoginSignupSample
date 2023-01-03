import React,{useState} from 'react';
import {
  StyleSheet,
  View,LogBox
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen,SignUpScreen,MainScreen,SMSpage,CodeConfirmed,LogedinSuccess } from './screens';


const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

const App = () => {

   
  // const DATA ={
  
  //      wyzname : "w3yzdev"
  // }


return (
  <NavigationContainer>
    {/* <AppContext.Provider value={DATA}> */}
  <Stack.Navigator

  //  drawerContent={()=> <DrawerContent />}
  initialRouteName="LoginScreen"
  screenOptions={{
     headerShown:false,
  }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} ></Stack.Screen>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} ></Stack.Screen>
      <Stack.Screen name="MainScreen" component={MainScreen} ></Stack.Screen>
      <Stack.Screen name="SMSpage" component={SMSpage} ></Stack.Screen>
      <Stack.Screen name="CodeConfirmed" component={CodeConfirmed} ></Stack.Screen>
      <Stack.Screen name="LogedinSuccess" component={LogedinSuccess} ></Stack.Screen>
    </Stack.Navigator>
      </NavigationContainer>
  );
};
const styles = StyleSheet.create({
});
export default App;