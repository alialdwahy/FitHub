import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { COLORS, FONTS, SIZES } from '../../constant';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { ic_edit } from '../../assets/icons/svg/ic_edit';
import { ic_logout } from '../../assets/icons/svg/ic_logout';
import { useDispatch } from 'react-redux';
import ServiceMaster from '../../api/networkApi/ServiceMaster';
import { ProfileItemType } from '../../types/genericTypes'; 
import useUserController from '../../view-controller/useUserController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIENDPOINTS from '../../api/ApiEndPoints';
import InputField from '../../components/LoginComponent/InputField';

export default function Profile ({ navigation}: any)  {

  const { profileData ,updateProfile, uploadImage, getAllProfileData } = useUserController();
  const [dataAll, setDataAll] = useState<ProfileItemType| null>(null);

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [name, setName] = useState(dataAll?.name || '');
  const [firstName, setFirstName] = useState(dataAll?.firstName || '');
  const [lastName, setLastName] = useState(dataAll?.lastName || '');
  const [email, setEmail] = useState(dataAll?.email || '');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<null | number>(null);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  
    
  useEffect (() =>  {
    setLoading(true); 
    if (profileData) {
      setDataAll(profileData[1]); 
       setLoading(false); 
    }
  }, [dispatch, profileData]);


  // console.log('dataAll --------->>>>>>', profileData)
    
  const handleGenderSelection = (selectedGender: string) => {
    if (selectedGender === 'male') {
      setGender(0); // 0 for male
    } else if (selectedGender === 'female') {
      setGender(1); // 1 for female
    }
  };
   

  const handleImageUpload = async() => {
    setLoading(true); 
    launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (response.assets && response.assets.length > 0) {
        // setProfileImage(response.assets[0].uri);
        const selectedImage = response.assets[0]; 
        if (selectedImage && selectedImage.uri  && selectedImage.type) {
          const imageData = {
            uri: selectedImage.uri,
            name: selectedImage.fileName || `photo_${Date.now()}.jpg`,
            type: selectedImage.type,
          };
  
          try {

            const id = await AsyncStorage.getItem('id');
            if (!id) {
              throw new Error('User ID not found in storage');
            }
            setProfileImage(selectedImage.uri);
            // await uploadImage({ id: id, attachment: imageData });
            const response = await ServiceMaster.uploadImage(id, imageData)
            console.log('API Response:', response);
            Alert.alert('Success', 'Image uploaded successfully');

            setLoading(false); 
          } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image');
            setLoading(false); 
          }
        }else {
          console.error('Image selection failed or invalid image data:', selectedImage);
          Alert.alert('Error', 'Invalid image data, please try again.');
        }
  
      }
    });
  };

  const handleUpdateProfile = async () => {
    // Update profile logic]  
    setLoading(true); 
    setIsEditing(false);
    setModalVisible(false);
    // navigation.navigate('Home');
    let data = { name,email,gender, firstName,lastName, phone, }
    console.log('Data to be sent:', data);
    try {

      const id = await AsyncStorage.getItem('id');
      if (!id) {
        throw new Error('User ID not found in storage');
      }
      const response =  await ServiceMaster.updateProfileData(id,data)
      console.log('API Response:', response);
        // Refetch the profile data after update
        
        await getAllProfileData();
    setLoading(false);
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
     
    }catch(error) {
      setLoading(false);
      Alert.alert('Profile Updated', 'Your profile filed!');
    } 
  };




  const handleDeleteProfile = async () => {
    setLoading(true); 
    try {

      const id = await AsyncStorage.getItem('id');
      if (!id) {
        throw new Error('User ID not found in storage');
      }
      const response =  await ServiceMaster.deleteProfileData(id)
      console.log('API Response:', response);
      // Check the second element for the success status and message
      const success = response?.[1]?.success;
      const message = response?.[1]?.message || 'An unexpected error occurred';
  
      if (success) {
        Alert.alert('Account Delete', message,  [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Authentication'),
          },
        ]);
       
      } else {
        Alert.alert('Error', message);
      }
  
      setLoading(false);
    }catch(error) {
      setLoading(false);
      Alert.alert('Error', 'An error occurred while deleting your account');

    } 
  };




  const handleLogOut = async () => {
    // Update profile logic
    try {
    const response =  await ServiceMaster.getLogOut()
    console.log('logo test login ------> ', response)  
         setLoading(false);
         await AsyncStorage.removeItem('token');
          Alert.alert('LogOut Successful', 'You have successfully logged Out!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Authentication'),
            },
          ]);
          }catch(error) {
            setLoading(false);
          }
  };
 
    // console.log('test value ----> ',dataAll)
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleLogOut}>
          <SvgXml xml={ic_logout} width="30" height="40"  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <SvgXml xml={ic_edit} width="30" height="40"  />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleImageUpload}>
          <Image source={{ uri: dataAll?.profilePicture || profileImage }} style={styles.profileImage} />
          </TouchableOpacity>
          <Text style={styles.profileName}>{dataAll?.name}</Text>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.icon} >First Name:</Text>
          <Text style={styles.contactText}>{dataAll?.firstName}</Text>
        </View>
        <View style={styles.contactContainer}>
        <Text style={styles.icon} >Last Name:</Text>
          <Text style={styles.contactText}>{dataAll?.lastName}</Text>
        </View>
        <View style={styles.contactContainer}>
        <Text style={styles.icon} >Id Number:</Text>
          <Text style={styles.contactText}>{dataAll?.identificationNumber}</Text>
        </View>
        <View style={styles.contactContainer}>
        <Text style={styles.icon} >Gander:      </Text>
          <Text style={styles.contactText}>{dataAll?.gender}</Text>
        </View>
        <View style={styles.contactContainer}>
        <Text style={styles.icon} >Email:         </Text>
          <Text style={styles.contactText}>{dataAll?.email}</Text>
        </View>
        <View style={styles.contactContainer}>
        <Text style={styles.icon} >Mobile:      </Text>
          <Text style={styles.contactText}>{dataAll?.phone}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleDeleteProfile} >
      <Text style={styles.buttonText}>Delete Account</Text>
    </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <InputField
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
            <InputField
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your First Name"
            />
            <InputField
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your Last Name"
            />
            <View style={styles.radioContainer}>
            <TouchableOpacity
        style={styles.radioOption}
        onPress={() => handleGenderSelection('male')}
      >
        <View style={[
          styles.radioCircle,
          gender === 0 && styles.radioCircleSelected // check for 0 for male
        ]} />
        <Text style={styles.radioText}>Male</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.radioOption}
        onPress={() => handleGenderSelection('female')}
      >
        <View style={[
          styles.radioCircle,
          gender === 1 && styles.radioCircleSelected // check for 1 for female
        ]} />
        <Text style={styles.radioText}>Female</Text>
      </TouchableOpacity>
</View>
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
            />
            <InputField
              value={phone.toString()}
              onChangeText={setPhone}
              placeholder="Enter your mobile number"
            />
            <View style={styles.buttonpup}>
            <Button title="Cancel"  onPress={() => setModalVisible(false)} color="red" />
            <Button title="Update " onPress={handleUpdateProfile}  />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonpup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20, // Padding around the buttons
    marginTop: 20, // Space above the button container
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: COLORS.colorPrim,
  },
  headerTitle: {
    color:COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.colorPrim,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 20,
    color: COLORS.lightGray
  },
  contactText: {
    fontSize: 16,
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    width: '75%',
    height: verticalScale(40),
    backgroundColor:COLORS.colorPrim,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:25,
    position: 'absolute',
    top: hp('82%'),
    left:moderateScale(42),
    
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.subtitle,
    fontFamily:  FONTS.montserratBold,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.backgroundPrim,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircleSelected: {
    backgroundColor: COLORS.colorPrim,
  },
 
});


