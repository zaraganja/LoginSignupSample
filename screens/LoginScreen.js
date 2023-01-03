import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    StatusBar,
    Image,
    ImageBackground,
    ScrollView,
    Alert,
    RefreshControl,
    Modal,
    ActivityIndicator,
    BackHandler,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard, Dimensions
} from "react-native";
// ijade formik va yup .form hamun field hamuno ba in do ta misazim
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Checkbox } from "./Checkbox";
import FontAwesome from 'react-native-vector-icons/FontAwesome';;
import Tooltip from 'react-native-walkthrough-tooltip';










const LoginScreen = (props) => {


    const [Tooltipp, setTooltipp] = useState(false);
    const [RememberMe, setRememberMe] = useState(false);
    const validationSchema = yup.object().shape({

        email: yup.string().email('Invalid e-mail address'),
        password: yup.string().min(8, 'Password length must be at least 8 characters')
    })
    const[EmailYup,setEmailYup]=useState(false);
    const [PassYup,setPassYup]=useState(false);
    const image = { imageRef: '../assets/images/splashimg.png' };
    const [animating, setanimating] = useState(false);


    const [SecureIt, setSecureIt] = useState(true);
    // refreshcontrol const
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    const [dbusername, setdbUsername] = useState('');
    const [dbtoken, setdbToken] = useState('');
    const [dbUid, setdbUid] = useState('');


    // const createChannels = () => {
    //     PushNotification.createChannel({
    //         channelId: "w3yz-channel",
    //         channelName: "w3yz Channel",

    //     })
    // }
    // const [token,settoken]=useState();
    // const [Os,setOs]=useState();
    // const GetNotificationToken = () => {
    //     PushNotification.configure({
    //         // (optional) Called when Token is generated (iOS and Android)
    //         onRegister: function (token) {
    //             console.log("TOKEN:", token.token);
    //             settoken(token.token);
    //             setOs(token.os);


    //         }
    //     })
    // }


    useEffect(() => {
        getData();
        // createChannels();
        // GetNotificationToken();
    }, []);

    const getData = () => {
        (

            AsyncStorage.multiGet(['rememberMe'])
                .then(response => {
                    console.log("hey remember:" + response);
                    // false yani ghablan beni hatirla zade
                    if (response[0][1] === "false") {

                        AsyncStorage.multiGet(['Username', 'token', 'userId'])
                            .then(response => {

                                if (response[0][1] != null && response[1][1] != null && response[2][1] != null) {
                                    console.log(response[0][0]) // Key1
                                    console.log(response[0][1]) // Value1
                                    setdbUsername(response[0][1])
                                    console.log(response[1][0]) // Key2
                                    console.log(response[1][1]) // Value2
                                    console.log(response[2][0])
                                    console.log(response[2][1])
                                    console.log("if loged in or not?! DBdata" + response);
                                                              
                                    props.navigation.navigate('MySites');


                                }


                            })
                    }
                })

        )
    }
 


    return (

        <KeyboardAvoidingView contentContainerStyle={{ flexGrow: 1, height: Dimensions.get("window").height, backgroundColor: 'white' }}
            behavior="height"
            keyboardVerticalOffset={1}
        >
            <SafeAreaView style={{
                flexGrow: 1, height: Dimensions.get('window').height, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
            }}>
             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', minHeight: '100%', height: 'auto' }}>



                    <Modal
                        visible={animating}
                        transparent={true}
                        opacity={0.2}
                        style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', opacity: 0.2 }}>

                        <ActivityIndicator
                            visible={animating}
                            size={50}
                            color="#6018BB"
                            style={{ marginTop: '100%' }}
                        //overlayColor="rgba(255,255,255,0.75)"
                        ///source={require("../assets/images/98195-loader.json")}
                        // animationStyle={styles.lottie}
                        // speed={1}
                        >

                        </ActivityIndicator>

                    </Modal>

                    <SafeAreaView style={{ flex: 1 }}  >
                        <SafeAreaView style={{
                            backgroundColor: '#FFFFFF', justifyContent: 'center', marginLeft: '-8%',
                            alignItems: 'center', flexDirection: 'column', marginTop: '25%',
                        }}>
                            {/* <Image source={require('../assets/images/loginic.png')} /> */}
                            
                            <Text allowFontScaling={false} style={LoginStyles.txtgiris}>Login</Text>
                            <Text allowFontScaling={false} style={LoginStyles.ustTXT}>Welcome to Zahra's Login SignUp sample project!</Text>

                        </SafeAreaView>

                        {/* // inja ba Formik mitunim etelaate fieldharo be server ya hamun api ersal konim
            va niyazi be estefade az useState nadarim pas state haro comment mikonim */}

                        <Formik
                            initialValues={{ email: '', password: '', rememberMe: false }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values.email + values.password);


                                // useEffect(() => {
                                axios.post('https://w3yz.com/api/login', {

                                    'email': values.email,
                                    'password': values.password,
                                    'mobiletoken': "notification token",
                                    'os':'android'
                                }

                                )
                                    .then(response => {

                                        console.log(response)
                                        if (response.data.error == true) {
                                            Alert.alert('username or password is incorrect!'); setanimating(false);
                                        }
                                        //Alert.alert(response.data.data.name);
                                        AsyncStorage.multiSet([['Username', response.data.data.name], ['token', response.data.data.token], ['userId', response.data.data.uid + ""]], () => {
                                            console.log("after asyncsetitem");
                                    
                                            Alert.alert("you loged in successfully!");
                                            props.navigation.navigate("LogedinSuccess");
                                            //props.navigation.navigate('MySites');
                                            setanimating(false);

                                        })

                                    }

                                        // seDataToDB,

                                        //console.log("message is:" + response.data.data.name),

                                        // console.log("username after setDB:" + username)

                                    )
                                    .catch(error => {
                                        // console.error('There was an error!', error);
                                        Alert.alert(error),
                                            setanimating(false)
                                    })

                            }
                            }
                        >
                            {
                                ({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => (

                                    <View style={LoginStyles.Style3}>
                                        <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", alignSelf: 'flex-start', marginLeft: '8%', color: '#344054', marginBottom: 4, fontSize: 14 }}>E-mail</Text>
                                        <TextInput
                                            allowFontScaling={false}
                                            textContentType="emailAddress"
                                            keyboardType="email-address"
                                            placeholder="E-mail"
                                            placeholderTextColor={'#707070'}
                                            style={LoginStyles.InputTxTlStyle}
                                            onBlur={handleBlur('email')}
                                            onChangeText={handleChange('email')}
                                            value={values.email}
                                            autoCapitalize='none'
                                            onEndEditing={()=> setEmailYup(true)}


                                        >

                                        </TextInput>
                                        {/* formik va yup be ma in ejazaro mide ke error haye formemun ro ham nemayesh bedim */}
                                        <View style={{ width: '100%', marginLeft: '15%', marginTop: '0.5%',marginBottom:'1.5%' }}>
                                            <Text allowFontScaling={false} style={{opacity:EmailYup?1:0, color: '#FF0000', fontSize: 10, fontFamily: "Poppins-Regular" }}>{errors.email}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start'}}>
                                            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", marginLeft: '8%', color: '#344054', fontSize: 14, marginRight: '1%' }}>Password</Text>
                                            <Tooltip
                                                isVisible={Tooltipp}
                                                content={

                                                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',backgroundColor:'#1E0345' }}>
                                                        <Text allowFontScaling={false} style={{ color: '#C6C6C6', fontSize: 12, fontFamily: "Poppins-Regular", marginTop: '5%' }}>{`Parolanızın aşağıdakileri
içerdiğinden emin olun`}</Text>
                                                        <View style={{ marginTop: '7%', marginLeft: '-10%' }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <AntDesign name='checkcircleo' color={'#00C64A'} />
                                                                <Text allowFontScaling={false} style={LoginStyles.ToolTipTEXT}>Küçük harfler</Text>
                                                            </View>
                                                            <View style={LoginStyles.ToolTipView}>
                                                                <AntDesign name='closecircleo' color={'#EE4D67'} />
                                                                <Text allowFontScaling={false} style={LoginStyles.ToolTipTEXT}>Büyük harfler</Text>
                                                            </View>
                                                            <View style={LoginStyles.ToolTipView}>
                                                                <AntDesign name='checkcircleo' color={'#00C64A'} />
                                                                <Text allowFontScaling={false} style={LoginStyles.ToolTipTEXT}>Sembol</Text>
                                                            </View>
                                                            <View style={LoginStyles.ToolTipView}>
                                                                <AntDesign name='checkcircleo' color={'#00C64A'} />
                                                                <Text allowFontScaling={false} style={LoginStyles.ToolTipTEXT}>Sayı</Text>
                                                            </View>
                                                            <View style={LoginStyles.ToolTipView}>
                                                                <FontAwesome name='circle-thin' color={'#C6C6C6'} />
                                                                <Text allowFontScaling={false} style={LoginStyles.ToolTipTEXT}>En az 8 karakter</Text>
                                                            </View>
                                                        </View>

                                                    </View>}
                                                placement="top"
                                                onClose={() => setTooltipp(false)}
                                            >
                                                <TouchableOpacity onPress={() => setTooltipp(true)}  >
                                                    <SimpleLineIcons name='question' size={16} color={'#D0D5DD'} style={{}}/>
                                                </TouchableOpacity>
                                            </Tooltip>
                                        </View>
                                        <TextInput
                                            allowFontScaling={false}
                                            textContentType="password"
                                            keyboardType="default"
                                            placeholder="Password"
                                            placeholderTextColor={'#707070'}
                                            secureTextEntry={SecureIt}
                                            style={[LoginStyles.InputTxTlStyle, { marginTop: '1%' }]}
                                            onBlur={handleBlur('password')}
                                            onChangeText={handleChange('password')}
                                            value={values.password}
                                            autoCapitalize='none'
                                            onEndEditing={()=> setPassYup(true)}

                                        >
                                        </TextInput>
                                        <TouchableOpacity style={{ marginTop: '-9%', marginRight: '-70%', height: '8%', width: '14%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSecureIt(!SecureIt)}>
                                            <Feather name={SecureIt ? 'eye' : 'eye-off'} size={18} color={'#101828'} />
                                        </TouchableOpacity>
                                        <View style={{ width: '100%', marginLeft: '15%', marginTop: '0.5%' }}>
                                            <Text allowFontScaling={false} style={{opacity:PassYup?1:0, marginTop: '1%', color: '#FF0000', fontFamily: "Poppins-Regular", fontSize: 10 }}>{errors.password}</Text>
                                        </View>
                                        <SafeAreaView style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-around', width: '105%', marginLeft: '-3.5%' }} >
                                            <TouchableOpacity onPress={()=> {setFieldValue('rememberMe', !RememberMe);setRememberMe(!RememberMe)}} style={{ flexDirection: 'row' }}>
                                                <Checkbox

                                                    value={values?.rememberMe}
                                                    onValueChange={nextValue1 => { setFieldValue('rememberMe', nextValue1), setRememberMe(nextValue1), console.log(RememberMe), AsyncStorage.multiSet([['rememberMe', RememberMe + ""]]) }}
                                                //onEndEditing={() => { setRememberMe(values?.rememberMe), AsyncStorage.multiSet([['rememberMe', RememberMe]]),console.log(RememberMe) }}
                                                >
                                                </Checkbox>
                                                <Text allowFontScaling={false} style={{ fontSize: 14, color: '#707070', marginTop: '5%', fontFamily: "Poppins-Regular" }}>Remember me</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginTop: '1.2%' }} onPress={() => props.navigation.navigate('ForgotEmail')}>
                                                <Text allowFontScaling={false} style={{ color: '#ffffff', fontSize: 14, fontFamily: "Poppins-Regular" }}>Parolanızı mı unuttunuz?</Text>
                                            </TouchableOpacity>
                                        </SafeAreaView>

                                        <TouchableOpacity
                                            style={LoginStyles.loginStyle}
                                            onPress={() => { handleSubmit(); setanimating(true) }}
                                        >
                                            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", color: '#6018BB', fontWeight: '700', fontSize: 16 }}>Login</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={LoginStyles.Google}
                                        // onPress={signIn}
                                        >
                                            {/* <GoogleSigninButton
                                                style={{ width: 192, height: 48 }}
                                                size={GoogleSigninButton.Size.Wide}
                                                color={GoogleSigninButton.Color.Light}
                                               onPress={signIn}
                                               
                                                //disabled={this.state.isSigninInProgress}
                                            /> */}

                                          

                                            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", color: '#101828', fontWeight: '700', fontSize: 16 }}>
                                                Google ile Giriş yap</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={LoginStyles.Facebook}

                                        >
                                            
                                            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", color: '#101828', fontWeight: '700', fontSize: 16 }}>Facebook ile Giriş yap</Text>
                                        </TouchableOpacity>

                                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                            <Text allowFontScaling={false} style={LoginStyles.sontxt1}>
                                                Dont have account?
                                            </Text>
                                            <TouchableOpacity onPress={() => props.navigation.navigate('SignUpScreen')}>
                                                <Text allowFontScaling={false} style={[LoginStyles.sontxt1, { color: '#6018BB' }]}>
                                                    {` `} SIGN UP HERE!
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                )

                            }
                        </Formik>

                        {/* 
            <View style={{flex:3,backgroundColor:'#FFFFFF',marginTop:'40%'}}>
                <View><Text>Forgot your password?</Text></View>
                <View></View>
                <View></View>
            </View> */}


                    </SafeAreaView>



                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>








    )

}



const LoginStyles = StyleSheet.create({

    Style1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',


    },
    Style2: {

        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'blue',
        marginTop: 30,
        marginBottom: 40

    },
    TextStyle: {
        fontSize: 20,
        fontFamily: "Poppins-Regular",
        backgroundColor: 'white'
    },
    Style3: {
        backgroundColor: '#FFFFFF',
      
        marginTop: '0%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginRight: '7%',
        height: '65%',
        paddingBottom: '10%',

    },
    InputTxTlStyle: {
        width: '85%',
        height: '10%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        paddingLeft: '3%',
        fontSize: 16,
        backgroundColor: '#ffffff',
        color:"#000000"

    },

    loginStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#DFD0F1',

        width: '86%',
        height: '10%',
        borderColor: '#6018BB',
        borderWidth: 1
    },
    Google: {
        display:'none',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#ffffff',
        width: '86%',
        height: '10%',
        borderColor: '#D0D5DD',
        borderWidth: 1,
        marginTop: '3%',
        flexDirection: 'row'
    },
    Facebook: {
        display:'none',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#ffffff',

        width: '86%',
        height: '10%',
        borderColor: '#D0D5DD',
        borderWidth: 1,
        marginTop: '3%',
        flexDirection: 'row'
    },
    txtgiris: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#101828',
        fontFamily: "Poppins-Regular",
        marginTop: '2%'
    },
    ustTXT: {
        fontSize: 14,
        color: '#101828',
        fontFamily: "Poppins-Regular",
        marginTop: '2%'
    },
    sontxt1: {
        fontFamily: "Poppins-Regular",
        fontSize: 18,
        color: '#101828',


    },
    ToolTipView: {
        flexDirection: 'row',
        marginTop: '1.5%',

    },
    ToolTipTEXT: {
        color: '#00C64A',
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: '7%',
        marginTop: '-2%'
    },



})
export { LoginScreen }