import axios from "axios";
import { Alert, NativeModules } from "react-native";   
import APIENDPOINTS from "./ApiEndPoints";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { AutoReadSMSModule } = NativeModules;

export const instance = axios.create({
  baseURL: APIENDPOINTS.PROD_BASEURL,
  timeout: 60000,
});

instance.interceptors.response.use((response) => {
    return response;
  },  (error) => {
    return error;
  }
);

instance.interceptors.request.use(async (config) => {
  const sessionDigest = await AsyncStorage.getItem('token'); // get stored sessionDigest
  if (sessionDigest) {
    config.headers.Authorization = `Bearer ${sessionDigest}`;
  }
  if (config.data instanceof FormData) {
    // FormData automatically sets the correct boundary
    config.headers["Content-Type"] = 'multipart/form-data';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const responeBody = async (response : any)  => {

  if (response.status == 200) { 
      return [response.data.status, response.data];
  } else {
    // configure error analytics
   
    return [response.data.status, response.data.error  || 'An error occurred'];
   
    }
};

const errorResponse = async (error: any) => {
  // if (!isdebug) {
  //  // configure error analytics
  // } 

  if (error.response) {
    const errors = error.response.data?.errors;
    if (errors?.length > 0) {
      return [errors[0].errorCode, errors];
    }
    return [-1, error.response.data];
  } else if (error.request) {
    return [-1];
  } 
};

const requests = {
  get: async (url: string, body: any, headers: any) => {
    let reqHeaders = {
      headers: {
        ...headers,
      },
    };
    return instance
      .get(url, body, )
      .then(responeBody)
      .catch(errorResponse);
  },

  post: async (url: string, body: any, headers: any ) => {
    console.log(url)
    let reqHeaders = {
      headers: {
        ...headers,
      },
    };

    return await instance
      .post(url, body, reqHeaders)
      .then(responeBody)
      .catch(errorResponse);
  },
  patch: async (url: string, body: any, headers: any) => {
    let reqHeaders = {
      headers: {
        ...headers,
      },
    };

    return await instance
      .patch(url, body, reqHeaders)
      .then(responeBody)
      .catch(errorResponse);
  },
  put: async (url: string, body: any, headers: any) => {
    console.log(url)
    let reqHeaders = {
      headers: {
        ...headers,
      },
    };
    return instance
      .put(url, body, reqHeaders)
      .then(responeBody)
      .catch(errorResponse);
  },
  delete: async (url: string, body: any, headers: any) => {
    let reqHeaders = {
      headers: {
        ...headers,
      },
    };
    return instance
      .delete(url, body, )
      .then(responeBody)
      .catch(errorResponse);
  },
};

export default requests;