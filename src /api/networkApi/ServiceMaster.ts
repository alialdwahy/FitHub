import  APIENDPOINTS  from "../ApiEndPoints";
import { checkIfInternetIsConnected } from "../../utils/checkIfInternetIsConnected";
import requests from "../HttpServices";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



// Define an interface for credentials
export interface SignInCredentials {
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
  getTodosList: async () => {
    if (await checkIfInternetIsConnected()) { 
      return requests.get('todos', null, null);
    }
  },

   
  getLogIn: async (dataBody: SignInCredentials) => {
    if (await checkIfInternetIsConnected()) { 
    return requests.post(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.SESSION_DIGEST, dataBody, null) 
  }
  else {
    throw new Error('No internet connection');
    
  }
},

getLogOut: async () => {
  if (await checkIfInternetIsConnected()) { 
  return requests.get(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.SESSION_LOGOUT, null, null)
  }else {
    throw new Error('No internet connection'); 
  }
},

getSignUp: async (dataBody: SignUpCredentials) => {
  if (await checkIfInternetIsConnected()) { 
  return requests.post(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.SIGN_UP, dataBody, null)
  }else {
    throw new Error('No internet connection');
  }
},

getProfileData: async () => {
  if (await checkIfInternetIsConnected()) { 
   return requests.get(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.PROFILE, null, null);
  } else {
    throw new Error('No internet connection'); 
  }
},

updateProfileData: async (id: string, bodyData: UpdateCredentials) => {

      const url = `${APIENDPOINTS.PROD_BASEURL}${APIENDPOINTS.UPDATE_PROFILE}/${id}`;
      console.log('urltest------>', url)
      if (await checkIfInternetIsConnected()) { 
return requests.put(url, bodyData, null);
} else {
  throw new Error('No internet connection'); 
}
},

deleteProfileData: async (id: string) => {
    const url = `${APIENDPOINTS.PROD_BASEURL}${APIENDPOINTS.DELETE_PROFILE}/${id}`;
  console.log('Request URL:', url);
  if (await checkIfInternetIsConnected()) { 
  return  requests.delete(url, null, null);
}
},




uploadImage: async (id: string,bodyData: any ) => {
    const formData = new FormData();
formData.append('attachment', {
  uri: bodyData.uri,
  name: bodyData.name,
  type: bodyData.type,
});
    const url = `${APIENDPOINTS.PROD_BASEURL}${APIENDPOINTS.UPLOAD_IMAGE}/${id}/picture`;
    if (await checkIfInternetIsConnected()) { 
    return requests.post(url, formData, { 
    headers: {
    'Content-Type': 'multipart/form-data',},
});
    }
  },


  getClass: async () => {
    if (await checkIfInternetIsConnected()) { 
     return requests.get(APIENDPOINTS.PROD_BASEURL+APIENDPOINTS.GET_CLASS, null, null);
    } else {
      throw new Error('No internet connection'); 
    }
  },

  getClassDetails: async (id: string,) => {
    const url = `${APIENDPOINTS.PROD_BASEURL}${APIENDPOINTS.GET_CLASS_Details}/${id}`;
    console.log("Fetching class details from URL:", url); 
    if (await checkIfInternetIsConnected()) { 
     return requests.get(url, null, null);
    } else {
      throw new Error('No internet connection'); 
    }
  },


  classEnroll: async (id: string,) => {
    const url = `${APIENDPOINTS.PROD_BASEURL}${APIENDPOINTS.CLASS_ENROLL}/${id}`;
    if (await checkIfInternetIsConnected()) { 
    return requests.post(url, null, null) 

  }
  else {
    throw new Error('No internet connection');
    
  }
},
  
};

export default ServiceMaster;