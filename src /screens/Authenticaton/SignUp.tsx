import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTS, SIZES } from '../../constant';
import InputField from '../../components/LoginComponent/InputField';
import SignUpButton from '../../components/LoginComponent/SignUpButton';
import ServiceMaster from '../../api/networkApi/ServiceMaster';
import {app_logo} from '../../assets/icons/svg/app_logo';
import { SvgXml } from 'react-native-svg';




const SignUp = ({ navigation }: any) => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      Alert.alert('Sign Up  Error', 'Passwords do not match',)
      return;
    }
    setLoading(true); 
    // navigation.navigate('Home');
    let data = {
      "name": name,
      "username":username,
      "email": email,
      "password": password
    }
    console.log('data test-', data)
    try {
      const response =  await ServiceMaster.getSignUp(data)
      
setLoading(false);
    Alert.alert('Sign Up  Successful', 'You have successfully logged in!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Authentication'),
      },
    ]);
    }catch(error) {
      setLoading(false);
    
    }
  };


  const handleNext = () => {
    navigation.navigate('Authentication');
};
  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
      <SvgXml xml={app_logo} width="100" height="100" style={styles.logo} />
      <Text style={styles.title}>Sign In To Build Your Fitness</Text>
        <InputField placeholder="Name" value={name} onChangeText={setName} />
        <InputField placeholder="Username" value={username} onChangeText={setUsername} />
        <InputField placeholder="Email" value={email} onChangeText={setEmail} />
        <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <InputField placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (<SignUpButton onPress={handleSignUp} />)}
          <TouchableOpacity onPress={handleNext}>
        <Text style={styles.text}>
          Already have an account? <Text style={styles.signInText}>Sign In</Text>
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  maincontainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrim,
  },
  version: {
    fontSize: 14,
    color: '#aaa',
    position: 'absolute',
    bottom: hp('4%'),
  },
  title: {
    fontSize: wp('7%'),
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: hp('5%'),
    // width: '100%',
    
  },
  textButton: {
    fontFamily: FONTS.montserratBold,
    color: COLORS.lightGray,
    textAlign: 'center',
    fontWeight: '200',
    fontSize: moderateScale(15),
  },
  button: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
  },
  signInText: {
    color: COLORS.colorPrim, // Customize the color for "Sign In"
    fontWeight: 'bold',
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
    bottom: hp('10%'),
  },
});

export default SignUp;
