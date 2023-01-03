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
    Keyboard, Dimensions,
    TouchableHighlight
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Checkbox } from "./Checkbox";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import Tooltip from 'react-native-walkthrough-tooltip';




const SignUpScreen = (props) => {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
        webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
        profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
            } else {
                // some other error
            }
        }
    };
    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ isLoginScreenPresented: !isSignedIn });
    };
    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        this.setState({ currentUser });
    };
    signOut = async () => {
        try {
            await GoogleSignin.signOut();
            this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    const [Tooltipp, setTooltipp] = useState(false);
    const [RememberMe, setRememberMe] = useState(false);
    const [EmailYup,setEmailYup]=useState(false);
    const [PassYup,setPassYup]=useState(false);
    const [PhoneNumYup,setPhoneNumYup]=useState(false);
    const validationSchema = yup.object().shape({

        email: yup.string().email('Geçersiz e posta adresi'),
        password: yup.string().min(8, 'Şifrenin uzunluğu minimum 8 karakter olmalı'),
        phoneNum: yup.string().length(11, 'Telefon numarası 11 hane olmali')
    })
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



    // const [dbusername, setdbUsername] = useState('');
    // const [dbtoken, setdbToken] = useState('');
    // const [dbUid, setdbUid] = useState('');

    // useEffect(() => {
    //     getData();
    // }, []);

    // const getData = () => {
    //     (

    //         AsyncStorage.multiGet(['rememberMe'])
    //             .then(response => {
    //                 console.log(response);
    //                 if (response[0][1] == "false") {

    //                     AsyncStorage.multiGet(['Username', 'token', 'userId'])
    //                         .then(response => {

    //                             if (response[0][1] != null && response[1][1] != null && response[2][1] != null) {
    //                                 console.log(response[0][0]) // Key1
    //                                 console.log(response[0][1]) // Value1
    //                                 setdbUsername(response[0][1])
    //                                 console.log(response[1][0]) // Key2
    //                                 console.log(response[1][1]) // Value2
    //                                 console.log(response[2][0])
    //                                 console.log(response[2][1])
    //                                 console.log("if loged in or not?! DBdata" + response);

    //                                 props.navigation.navigate('MySites');


    //                             }


    //                         })
    //                 }
    //             })

    //     )
    // }

    // const backAction = () => {
    //     Alert.alert(
    //         "",
    //         "Are you sure you want to exit app?",
    //         [
    //             {
    //                 text: "hayir",
    //                 onPress: () => console.log("Cancel Pressed"),
    //                 style: "hayir"
    //             },
    //             { text: "evet", onPress: () => BackHandler.exitApp() }
    //         ]
    //     );


    //     return true;
    // };

    // useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress", backAction);

    //     return () =>
    //         BackHandler.removeEventListener("hardwareBackPress", backAction);
    // });

    return (
        <KeyboardAvoidingView contentContainerStyle={{ flexGrow: 1, height: Dimensions.get("window").height, backgroundColor: 'white' }}
            behavior="height"
            keyboardVerticalOffset={1}
        >
            <SafeAreaView style={{
                flexGrow: 1, height: Dimensions.get('window').height, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
            }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', minHeight: '100%', height: 'auto' }}>



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

                    
                        <SafeAreaView style={{
                            backgroundColor: '#ffffff',marginLeft:'-6%',marginBottom:'0%',
                            alignItems: 'center', flexDirection: 'column', marginTop: '15%',height:'12%'
                        }}>
                            {/* <Image source={require('../assets/images/loginic.png')} /> */}
                       
                            <Text allowFontScaling={false}  style={LoginStyles.txtgiris}>Sign Up Here!</Text>
                            <View style={{ flexDirection: 'row',backgroundColor:'#ffffff',height:'22%',justifyContent:'center',alignItems:'center' }}>
                                <Text allowFontScaling={false}  style={LoginStyles.ustTXT}>Do you have an account?</Text>
                                <TouchableOpacity onPress={()=> props.navigation.navigate('LoginScreen')} style={{ marginTop: '0%', marginLeft: '1.5%' }}>
                                    <Text style={[LoginStyles.ustTXT, { color: '#6018BB' }]}>Login here!</Text></TouchableOpacity>
                            </View>
                        </SafeAreaView>

                        {/* // inja ba Formik mitunim etelaate fieldharo be server ya hamun api ersal konim
            va niyazi be estefade az useState nadarim pas state haro comment mikonim */}

                        <Formik
                            initialValues={{ email: '', password: '', phoneNum: '', rememberMe: false }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values.email + values.password);

                                setanimating(true);
                                // useEffect(() => {
                                //axios.post('https://webasyon.com/api/login', {
                                    axios.post('https://w3yz.com/api/register', {

                                    'name':values.email.substring(0,values.email.lastIndexOf('@')),
                                    'email': values.email,
                                    'password': values.password,
                                    'mobile': values.phoneNum,
                                })
                                    .then(response => {
                                        console.log(response);
                                        if(response.data.error === true){setanimating(false);Alert.alert(response.data.message)}
                                        else if(response.data.error === false){
                                        AsyncStorage.multiSet([['Username', response.data.data.name], ['token', response.data.data.token], ['userId', response.data.data.uid + ""],['mobile',response.data.data.mobile]], () => {
                                            console.log("after asyncsetitem");
                                            props.navigation.navigate('SMSpage');
                                            setanimating(false);
                                        
                                        })
                                    }
                                    else{setanimating(false);
                                    Alert.alert(response.data.message)}
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
                                        <Text allowFontScaling={false} style={LoginStyles.TextInputTXTS}>E-mail</Text>
                                        <TextInput
                                            allowFontScaling={false}
                                            textContentType="emailAddress"
                                            keyboardType="email-address"
                                            placeholder="E-mail"
                                            placeholderTextColor={'#667085'}
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
                                            <Text allowFontScaling={false} style={{opacity:EmailYup?1:0, color: '#FF0000', fontSize: 10, fontFamily: "Poppins-Regular", }}>{errors.email}</Text>
                                        </View>




                                        <Text allowFontScaling={false} style={LoginStyles.TextInputTXTS}>Phone Number</Text>
                                        <TextInput
                                            allowFontScaling={false}
                                            textContentType="givenName"
                                            keyboardType="number-pad"
                                            placeholder="+90"
                                            placeholderTextColor={'#667085'}
                                            style={LoginStyles.InputTxTlStyle}
                                            onBlur={handleBlur('phoneNum')}
                                            onChangeText={handleChange('phoneNum')}
                                            value={values.phoneNum}
                                            autoCapitalize='none'
                                            onEndEditing={()=> setPhoneNumYup(true)}
                                        >
                                        </TextInput>
                                        {/* formik va yup be ma in ejazaro mide ke error haye formemun ro ham nemayesh bedim */}
                                        <View style={{ width: '100%', marginLeft: '15%', marginTop: '0.5%',marginBottom:'1.5%'}}>
                                            <Text allowFontScaling={false} style={{opacity:PhoneNumYup?1:0, color: '#FF0000', fontSize: 10, fontFamily: "Poppins-Regular", }}>{errors.phoneNum}</Text>
                                        </View>







                                        <View style={{ flexDirection: 'row', marginTop: '1%', alignSelf: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", color: '#344054', fontSize: 14, marginRight: '1%' }}>Password</Text>
                                            <Tooltip
                                                isVisible={Tooltipp}
                                                content={

                                                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' ,backgroundColor:'#1E0345'}}>
                                                        <Text allowFontScaling={false}  style={{ color: '#C6C6C6', fontSize: 12, fontFamily: "Poppins-Regular", marginTop: '5%' }}>{`Parolanızın aşağıdakileri
içerdiğinden emin olun`}</Text>
                                                        <View style={{ marginTop: '7%', marginLeft: '-10%' }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <AntDesign name='checkcircleo' color={'#00C64A'} />
                                                                <Text allowFontScaling={false}  style={LoginStyles.ToolTipTEXT}>Küçük harfler</Text>
                                                            </View>
                                                            <View style={LoginStyles.ToolTipView}>
                                                                <AntDesign name='closecircleo' color={'#EE4D67'} />
                                                                <Text allowFontScaling={false}  style={LoginStyles.ToolTipTEXT}>Büyük harfler</Text>
                                                            </View>
                                                            <View style={LoginStyles.ToolTipView}>
                                                                <AntDesign name='checkcircleo' color={'#00C64A'} />
                                                                <Text allowFontScaling={false}  style={LoginStyles.ToolTipTEXT}>Sembol</Text>
                                                            </View>
                                                            <View style={LoginStyles.ToolTipView}>
                                                                <AntDesign name='checkcircleo' color={'#00C64A'} />
                                                                <Text  allowFontScaling={false}  style={LoginStyles.ToolTipTEXT}>Sayı</Text>
                                                            </View>
                                                            <View style={LoginStyles.ToolTipView}>
                                                                <FontAwesome name='circle-thin' color={'#C6C6C6'} />
                                                                <Text allowFontScaling={false}  style={LoginStyles.ToolTipTEXT}>En az 8 karakter</Text>
                                                            </View>
                                                        </View>

                                                    </View>}
                                                placement="top"
                                                onClose={() => setTooltipp(false)}
                                            >
                                                <TouchableOpacity onPress={() => setTooltipp(true)}  >
                                                    <SimpleLineIcons name='question' size={16} color={'#D0D5DD'} style={{}}  />
                                                </TouchableOpacity>
                                            </Tooltip>
                                        </View>
                                        <TextInput
                                            allowFontScaling={false}
                                            textContentType="newPassword"
                                            keyboardType="default"
                                            placeholder="Password"
                                            placeholderTextColor={'#667085'}
                                            secureTextEntry={SecureIt}
                                            style={[LoginStyles.InputTxTlStyle, { marginTop: '1%' }]}
                                            onBlur={handleBlur('password')}
                                            onChangeText={handleChange('password')}
                                            value={values.password}
                                            autoCapitalize='none'
                                            onEndEditing={()=> setPassYup(true)}

                                        >
                                        </TextInput>
                                        <TouchableOpacity style={{ marginTop: '-11%', marginRight: '-83%', height: '8%', width: '14%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSecureIt(!SecureIt)}>
                                            <Feather name={SecureIt ? 'eye' : 'eye-off'} size={18} color={'#101828'} />
                                        </TouchableOpacity>
                                        <View style={{ width: '100%', marginLeft: '15%', marginTop: '0.5%' }}>
                                            <Text allowFontScaling={false} style={{opacity:PassYup?1:0, color: '#FF0000', fontFamily: "Poppins-Regular", fontSize: 10 }}>{errors.password}</Text>
                                        </View>


                                        <SafeAreaView style={{ opacity: 0, flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-around', width: '105%', marginLeft: '-3.5%' }} >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Checkbox

                                                    value={values?.rememberMe}
                                                    onValueChange={nextValue1 => { setFieldValue('rememberMe', nextValue1), setRememberMe(nextValue1), console.log(RememberMe), AsyncStorage.multiSet([['rememberMe', RememberMe + ""]]) }}
                                                //onEndEditing={() => { setRememberMe(values?.rememberMe), AsyncStorage.multiSet([['rememberMe', RememberMe]]),console.log(RememberMe) }}
                                                >
                                                </Checkbox>
                                                <Text allowFontScaling={false} style={{ fontSize: 14, color: '#707070', marginTop: '5%', fontFamily: "Poppins-Regular" }}>Beni hatırla</Text>
                                            </View>
                                            <TouchableOpacity style={{ marginTop: '1.2%' }}><Text allowFontScaling={false} style={{ color: '#6018BB', fontSize: 14, fontFamily: "Poppins-Regular" }}>Parolanızı mı unuttunuz?</Text></TouchableOpacity>
                                        </SafeAreaView>


                                        <TouchableOpacity
                                            style={LoginStyles.loginStyle}
                                            //onPress={() => { handleSubmit(); setanimating(true) }}
                                            onPress={() => {handleSubmit()}}
                                        >
                                            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", color: '#6018BB', fontWeight: '700', fontSize: 16 }}>Sign Up</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={LoginStyles.Google}
                                           // onPress={signIn}
                                        >
                        

                                            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", color: '#101828', fontWeight: '700', fontSize: 16 }}>
                                                Google ile kaydol</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={LoginStyles.Facebook}

                                        >
                                        
                                            <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", color: '#101828', fontWeight: '700', fontSize: 16 }}>Facebook ile kaydol</Text>
                                        </TouchableOpacity>

                                        <View style={{ flexDirection: 'column', marginTop: '5%', justifyContent: 'center', alignItems: 'center',display:'none' }}>
                                            <Text allowFontScaling={false}  style={LoginStyles.sontxt1}>
                                                {`Hesap oluşturduğunuz zaman W3yz’in
    koşullarını kabul etmiş olursunuz.`}
                                            </Text>
                                            <TouchableOpacity style={{ paddingBottom: '15%' }}>
                                                <Text allowFontScaling={false}  style={[LoginStyles.sontxt1, { color: '#1163FA' }]}>
                                                    Şartlar ve Koşullar ve Gizlilik Politikası.
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
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'column',
        height: '50%',
       width:'90%'
        

    },
    InputTxTlStyle: {
       height:'12%',
       width:'100%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        paddingLeft: '3%',
        fontSize: 16,
        backgroundColor:'#ffffff'


    },

    loginStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#DFD0F1',
        padding: 6,
        width: '100%',
        height: '12%',
        borderColor: '#6018BB',
        borderWidth: 1,
        marginTop: '-10%'
    },
    Google: {
        display:'none',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#ffffff',
        padding: 6,
        width: '86%',
        height: '9%',
        borderColor: '#D0D5DD',
        borderWidth: 1,
        marginTop: '3.5%',
        flexDirection: 'row'
    },
    Facebook: {
        display:'none',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#ffffff',
        padding: 6,
        width: '86%',
        height: '9%',
        borderColor: '#D0D5DD',
        borderWidth: 1,
        marginTop: '3.5%',
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
        fontSize: 16,
        color: '#101828',
        fontFamily: "Poppins-Regular",
       
    },
    sontxt1: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        color: '#9B9B9B',
    },
    ToolTipView: {
        flexDirection: 'row',
        marginTop: '1.5%'
    },
    ToolTipTEXT: {
        color: '#00C64A',
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        marginLeft: '7%',
        marginTop: '-2%'
    },
    TextInputTXTS: {
        fontFamily: "Poppins-Regular",
        alignSelf: 'flex-start',
        color: '#344054',
        marginBottom: 4,
        fontSize: 14
    }



})
export { SignUpScreen }