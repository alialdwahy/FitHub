import  APIENDPOINTS  from "../ApiEndPoints";
import { checkIfInternetIsConnected } from "../../utils/checkIfInternetIsConnected";
import requests from "../HttpServices";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResponseModel } from "../../types/genericTypes";



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

interface UpdateCredentials {
  name:string;
  email: string;
  gender: any;
  firstName: string;
  lastName: string;
  phone:string;
}
interface UploadImage {
  attachment: any
}


const ServiceMaster = {
  // getTodosList: async () => {
  //   if (await checkIfInternetIsConnected()) { 
  //     return requests.get('todos', null, null);
  //   }
  // },

  // //   getAllEmployees: async() => {
  // //     if (await checkIfInternetIsConnected) {
  // //       return requests.get(`${APIENDPOINTS.EMPLOYEES}`, null, null)
  // //     }
  // // },
   






                                                      //Log In Account Service//  

  getLogIn: async (dataBody: SignInCredentials) => {
    try {
    const response = await requests.post(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.SESSION_DIGEST, dataBody, null)
   const data = response[1]; // Adjust if response structure is different
   const token = data?.data?.token;
   await AsyncStorage.setItem('token',token)
  } catch (error) {
    Alert.alert('Login Failed',  error?.message);
    throw error; // 
  }
},





                                                      //Log Out Account Service //  

getLogOut: async () => {
  try {
  const response = await requests.get(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.SESSION_LOGOUT, null, null)
 const data = response[1]; // Adjust if response structure is different
 const token = data?.data?.token;
 const id = data?.data?.id;
 await AsyncStorage.removeItem('token',token)
 await AsyncStorage.removeItem('id',id)
 console.log('delete confirm ---------->', AsyncStorage.getItem('id'))
 console.log('delete confirm ---------->', AsyncStorage.getItem('token'))
} catch (error) {
  Alert.alert('LogOut Failed',  'Server Error, please try again.');
  throw error; // 
}
},





                                                      //Create Account Service //  

getSignUp: async (dataBody: SignUpCredentials) => {
  try {
  const response = await requests.post(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.SIGN_UP, dataBody, null)
     console.log("sign----", response)
     const data = response[1]; // Adjust if response structure is different
     console.log("sign----", data)
} catch (error) {
  Alert.alert('SignUp Failed',error.message);
  throw error; // 
}
},




                                                      //Fetch Profile Data  Service For User Profile//  

getProfileData: async () => {
  if (await checkIfInternetIsConnected()) { 
   return requests.get(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.PROFILE, null, null);
  } else {
    throw new Error('No internet connection');
  }
},





                                                      //Update Profile  Service For User Profile//  

updateProfileData: async (id: string, bodyData: UpdateCredentials): Promise<ResponseModel> => {
    try {
      const url = `${APIENDPOINTS.PROD_BASEURL}${APIENDPOINTS.UPDATE_PROFILE}/${id}`;
    console.log('Request URL:', url);
    console.log('Data to be sent:', bodyData);
    const response = await requests.put(url, bodyData, null);
    console.log('Full Raw Response:', response);
     // Check if the response is an array (unexpected type)
     if (Array.isArray(response)) {
      throw new Error('Unexpected array response from API');
    }
    // Check if the response is undefined or null
    if (!response) {
      throw new Error('No response data received from API');
    }
    // Check if the response contains the necessary properties for ResponseModel
    if ('data' in response && 'message' in response && 'status' in response && 'code' in response) {
      const data: ResponseModel = response as ResponseModel;
      console.log('API Response Data:', data);
      return data;
    } else {
      throw new Error('Response does not match expected structure');
    }
  } catch (error) {
    console.error('Error in updateProfileData:', error);
    Alert.alert('Profile Update Failed', error?.message || 'Your profile update failed!');
    throw error;
  }
},



                                                      //Delete Profile and Account Service For User Profile//  

deleteProfileData: async (id: string) => {

  try {
    const url = `${APIENDPOINTS.PROD_BASEURL}${APIENDPOINTS.DELETE_PROFILE}/${id}`;
  console.log('Request URL:', url);
  const response = await requests.delete(url, null, null);
  if (response) {
    console.log('API Response Data:', response);
    return response;
  } else {
    throw new Error;
  }
} catch (error) {
  console.error('Error in DeleteProfileData:', error);
  Alert.alert('Profile Delete Failed',  'Your profile Delete failed!');
  throw error;
}
},



                                                      //Upload Image Service For User Profile//  

uploadImage: async (id: string,bodyData: any ): Promise<ResponseModel> => {
  try {
    const formData = new FormData();
formData.append('attachment', {
  uri: bodyData.uri,
  name: bodyData.name,
  type: bodyData.type,
});
    const url = `${APIENDPOINTS.PROD_BASEURL}${APIENDPOINTS.UPLOAD_IMAGE}/${id}/picture`;
    console.log('url ------------>', url)
    console.log('FormData:', bodyData);
  const response = await requests.post(url, formData, { 
    headers: {
    'Content-Type': 'multipart/form-data',
  },
})
if (response && 'data' in response && 'message' in response && 'status' in response && 'code' in response) {
  return response as ResponseModel;

} else {
  throw new Error('Response does not match expected structure');
}
} catch (error) {
  console.error('Error uploading image:', error);
  Alert.alert('Upload Image Failed',  'Invalid Data, please try again.');
  throw error; // 
}
},
};

export default ServiceMaster;