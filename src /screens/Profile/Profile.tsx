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

const Profile = () => {

  const { profileData } = useUserController();
  const [dataAll, setDataAll] = useState<ProfileItemType| null>(null);

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
    
  useEffect (() =>  {
    setLoading(true); 
    if (profileData) {

      setDataAll(profileData[0]); 
       setLoading(false); 
    }
  }, [dispatch,profileData]);

  console.log('dataAll --------->>>>>>', profileData)
    

   

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        // setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleUpdateProfile = () => {
    // Update profile logic
    setIsEditing(false);
    setModalVisible(false);
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
  };

  const handleLogOut = async () => {
    // Update profile logic
    const response =  await ServiceMaster.getLogOut()
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
  };
 
    console.log('test value ----> ',dataAll)
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
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
        <TouchableOpacity style={styles.button} >
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
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your First Name"
            />
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your Last Name"
            />
            <View style={styles.radioContainer}>
  <TouchableOpacity
    style={styles.radioOption}
    onPress={() => setGender('male')}
  >
    <View style={[
      styles.radioCircle,
      gender === 'male' && styles.radioCircleSelected
    ]} />
    <Text style={styles.radioText}>Male</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
    style={styles.radioOption}
    onPress={() => setGender('female')}
  >
    <View style={[
      styles.radioCircle,
      gender === 'female' && styles.radioCircleSelected
    ]} />
    <Text style={styles.radioText}>Female</Text>
  </TouchableOpacity>
</View>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
            />
            <TextInput
              style={styles.input}
              value={phone}
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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
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

export default Profile;
