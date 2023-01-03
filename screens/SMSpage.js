
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Dimensions, Modal,Alert,
  ActivityIndicator, PermissionsAndroid
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import SmsListener from 'react-native-android-sms-listener';
//import {MySMSBroadcastReceiver,onReceive} from '../android/app/src/main/java/com/webasyon/MySMSBroadcastReceiver.java'







const SMSpage = (props) => {




  const [VerifyCode, setVerifyCode] = useState();
  const [AllowSMSto, setAllowSMSto] = useState(false);
  // const requestSMSPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
  //       {
  //         title: "SMS READ Permission",
  //         message:
  //           "Cool " +
  //           "so you can .",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can ");
  //     } else {
  //       console.log(" permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };


  const [phoneNumber, setphoneNumber] = useState('');
  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [PROPS, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });


  const [value, setValue] = useState('');
  const [animating, setanimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const sendSMS = () => {
   // requestSMSPermission();
    setanimating(true);
    AsyncStorage.multiGet(['userId', 'mobile'])
      .then(response => {
        if (response != null) {
          console.log("valusesss of product list issss isssss" + response);
          setphoneNumber(response[1][1]);
          axios.post('https://w3yz.com/api/mobile/sendverify', {
            'uid': response[0][1],
            'mobile': response[1][1],
          })
            .then(response => {
              //console.log("SSSSSSSSSSSMMMMMMMMMMMMMMMMMSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
              //console.log(response);
              setIsLoading(false);
              setanimating(false);
              // READ SMS CODE START
              // let subscription = SmsListener.addListener(message => {
              //   console.log("SMSMSMSMSMSMSMSMSMSMMSMSMS")
              //   let verificationCodeRegex = /Your w3yz activation code is : ([\d]{6})/
              //   if (verificationCodeRegex.test(message.body)) {
              //     let verificationCode = message.body.match(verificationCodeRegex)[1];
              //     setVerifyCode(verificationCode);
              //     // alert(verificationCode);
              //     // setValue(verificationCode);
              //     setAllowSMSto(true);
              //     subscription.remove();
              //     setanimating(false);
                  // READ SMS CODE END

             //   }
             // })
            })
            .catch(error => {
              console.error('There was an error!', error);
              setIsLoading(false);
              setanimating(false);
              Alert.alert("hata olustu!");
            })
        }
      })
  }

  const VerifySMSCode = () => {
    setanimating(true);
    AsyncStorage.multiGet(['userId'])
      .then(response => {
        if (response != null) {
          console.log("valusesss of product list issss isssss" + response);

          axios.post('https://w3yz.com/api/mobile/verifycode', {
            'uid': response[0][1],
            'verifycode': value,
          })
            .then(response => {
              console.log(response);
              if (response.data.error === false) {
                setanimating(false);
                Alert.alert(response.data.message);
                props.navigation.navigate('CodeConfirmed');

              }
              else{
                setanimating(false);
                Alert.alert(response.data.message);
              }
            
            })
            .catch(error => {
              console.error('There was an error!', error);
              setanimating(false);
              Alert.alert(response.data.message);
            })
        }
      })

  }


  useEffect(() => {
    if (isLoading) {

      sendSMS();
    }
    setIsLoading(false);

  }, [])

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>

      {/* ALLOW SMS MODAL START */}
      <Modal
        statusBarTranslucent={true}
        visible={AllowSMSto}
        animationType='slide'
        transparent={true}>
        <View style={{ width: '100%', height: Dimensions.get('window').height * 1.04, backgroundColor: 'rgba(96, 24, 187,0.7)', alignSelf: 'center', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '5%' }}>
          <View style={{ width: '92.5%', height: '35%', backgroundColor: '#ffffff', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', borderRadius: 4, opacity: 1,paddingTop:'5%' }}>
            <Text allowFontScaling={false} style={{ color: '#101828', fontSize: 18, fontWeight: '700', fontFamily: "Poppins-Regular",alignSelf:'center' }} >{`W3yz Uygulamasının mesajı okumasına
      ve kodu girmesine izin verilsin mi?`}</Text>
            <View style={{flexDirection:'row',width:'100%',alignSelf:'center',justifyContent:'center',alignItems:'center',marginTop:'3%'}}>
            <Text allowFontScaling={false} style={{ color: '#101828', fontSize: 14, fontFamily: "Poppins-Regular" }} >
              Uygulamada onay için kod
            </Text>
            <Text allowFontScaling={false} style={{ color: '#101828', fontSize: 14, fontFamily: "Poppins-Regular",fontWeight:'bold',marginTop:'-1%',marginLeft:'1%' }}>{VerifyCode}</Text>
            </View>
         
            <TouchableOpacity onPress={() => {setValue(VerifyCode);setAllowSMSto(false)}} style={{borderWidth:1,borderColor:'#6018BB',backgroundColor:'#DFD0F1',borderRadius:4,width:'92.17%',height:'21%',justifyContent:'center',alignItems:'center',marginTop:'8%'}}>
            <Text  allowFontScaling={false} style={{color:'#6018BB',fontSize:16,fontWeight:'700', fontFamily: "Poppins-Regular",}} >İzin ver</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setAllowSMSto(false)}  style={{borderWidth:1,borderColor:'#D0D5DD',backgroundColor:'#FFFFFF',borderRadius:4,width:'92.17%',height:'21%',justifyContent:'center',alignItems:'center',marginTop:'3.5%'}}>
            <Text  allowFontScaling={false} style={{color:'#6018BB',fontSize:16,fontWeight:'700', fontFamily: "Poppins-Regular",}} >Reddet</Text>
            </TouchableOpacity>

          </View>
        </View>

      </Modal >
      {/* ALLOW SMS MODAL END */}


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

      {/* <Image source={require('../assets/images/loginic.png')} /> */}
     
      <Text style={{ color: '#101828', fontFamily: "Poppins-Regular", fontSize: 24, fontWeight: 'bold', marginTop: '5%' }}>Check you SMS messages!</Text>
      <Text style={{ fontFamily: "Poppins-Regular", fontSize: 14, color: '#101828', marginTop: '3%' }}>{`we sent an sms message to this phone number: \n                             `}+{phoneNumber}</Text>



      <View style={Styles.root}>
        <CodeField
          ref={ref}
          caretHidden={false}
          // Use `caretHidden={false}` when users want to paste a text value
          value={value}
          onChangeText={code => setValue(code)}
          cellCount={CELL_COUNT}
          rootStyle={Styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text allowFontScaling={false}
              key={index}
              style={[Styles.cell, isFocused && Styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>


      <View style={{ flexDirection: 'row', marginTop: '1%' }}>
        <Text allowFontScaling={false} style={{ color: '#707070', fontSize: 12, fontFamily: "Poppins-Regular", marginRight: '2%' }}>
        Didn't receive SMS?
        </Text>
        <TouchableOpacity onPress={() => sendSMS() }>
          <Text allowFontScaling={false} style={{ color: '#6018BB', fontSize: 12, fontFamily: "Poppins-Regular" }} >
           Resend SMS
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={Styles.loginStyle}
        //onPress={() => { handleSubmit(); setanimating(true) }}
        onPress={() => { console.log(value), VerifySMSCode() }}
      >
        <Text allowFontScaling={false} style={{ fontFamily: "Poppins-Regular", color: '#6018BB', fontWeight: '700', fontSize: 16 }}>Confirm code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: '5%' }} onPress={() => props.navigation.navigate('SignUp')}>
        <Text allowFontScaling={false} style={{ fontSize: 14, fontWeight: '700', color: '#1163FA' }}>Back to Sign Up</Text>
      </TouchableOpacity>
    </View >
  )
}

const Styles = StyleSheet.create({
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
  root: { paddingTop: '3%', paddingBottom: '5%' },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 12 },
  cell: {
    width: 55,
    height: 60,
    lineHeight: 38,
    fontSize: 35,
    borderWidth: 1,
    borderColor: '#D6BBFB',
    textAlign: 'center',
    marginRight: '2%',
    borderRadius: 7.5,
    paddingTop: '3%',
    color: '#7F56D9',
    fontFamily: "Poppins-Regular",
    fontWeight: 'bold'

  },
  focusCell: {
    borderColor: '#ECE4F5',
  },

})
export { SMSpage }