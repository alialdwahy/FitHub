import  APIENDPOINTS  from "../ApiEndPoints";
import { checkIfInternetIsConnected } from "../../utils/checkIfInternetIsConnected";
import requests from "../HttpServices";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



// Define an interface for credentials
interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name:string;
  username:string;
  email: string;
  password: string;
}


const ServiceMaster = {
  getTodosList: async () => {
    if (await checkIfInternetIsConnected()) { 
      return requests.get('todos', null, null);
    }
  },

  //   getAllEmployees: async() => {
  //     if (await checkIfInternetIsConnected) {
  //       return requests.get(`${APIENDPOINTS.EMPLOYEES}`, null, null)
  //     }
  // },
   
  getLogIn: async (dataBody: SignInCredentials) => {
    try {

    const response = await requests.post(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.SESSION_DIGEST, dataBody, null)
   const data = response[1]; // Adjust if response structure is different
   const token = data?.data?.token;
   await AsyncStorage.setItem('token',token)

  } catch (error) {

    Alert.alert('Login Failed',  'Invalid credentials, please try again.');
    throw error; // 
  }
},

getLogOut: async () => {
  try {

  const response = await requests.get(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.SESSION_LOGOUT, null, null)
 const data = response[1]; // Adjust if response structure is different
 const token = data?.data?.token;
 await AsyncStorage.removeItem('token',token)

} catch (error) {

  Alert.alert('Login Failed',  'Invalid credentials, please try again.');
  throw error; // 
}
},

getSignUp: async (dataBody: SignUpCredentials) => {
  try {

  const response = await requests.post(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.SIGN_UP, dataBody, null)
     console.log("sign----", response)
     const data = response[1]; // Adjust if response structure is different
     
     console.log("sign----", data)

} catch (error) {

  Alert.alert('SignUp Failed',  'Invalid Data, please try again.');
  throw error; // 
}
},

getProfileData: async () => {
  if (await checkIfInternetIsConnected()) { 
   return requests.get(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.PROFILE, null, null);
  } else {
    throw new Error('No internet connection');
    
  }
},

updateProfileData: async () => {
  if (await checkIfInternetIsConnected()) { 
   return requests.put(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.UPDATE_PROFILE, null, null);
  } else {
    throw new Error('No internet connection');
    
  }
},
};

export default ServiceMaster;