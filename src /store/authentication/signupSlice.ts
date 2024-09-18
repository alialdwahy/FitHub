import {createSlice, nanoid} from '@reduxjs/toolkit';
import SignUpStore from './signupStore';
import { ProfileItemType, SignUpItemType, UploadImageItemType } from '../../types/genericTypes';



const initialState = SignUpStore;

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    ...initialState,
    isLoading: true,
    isError: false,

  }, 
  reducers: {
    createSignUp: (state, action: {payload: { name: string, username: string, email: string, password: string,}; type: string}) => {
        state.signUp = state.signUp.concat([
          {id: nanoid(),name: action.payload.name,username: action.payload.username,email: action.payload.email,password: action.payload.password,},
        ]);
      },
      uploadImage: (state, action: {payload: UploadImageItemType; type: string}) => {
        state.uploadImage = state.uploadImage.map((uploadItem: UploadImageItemType) => {
          if (uploadItem.id === action.payload.id) {
              uploadItem.attachment = action.payload.attachment;
              return uploadItem;
          }
          return uploadItem;
        });
        state.uploadImage.concat([action.payload]);
      },
      updateProfile: (state, action: {payload: ProfileItemType; type: string}) => {
        state.profileData = state.profileData.map((profileItem: ProfileItemType) => {
          if (profileItem.id === action.payload.id) {
            profileItem.name = action.payload.name;
            profileItem.username = action.payload.username;
            profileItem.email = action.payload.email;
            profileItem.firstName = action.payload.firstName;
            profileItem.lastName = action.payload.lastName;
            profileItem.phone = action.payload.phone;
            return profileItem;
          }
          return profileItem;
        });
        state.profileData.concat([action.payload]);
        console.log('updata---->>test',state.profileData)//

      },
      deleteProfile: (state, action: {payload: {id: string}; type: string}) => {
        state.profileData = state.profileData.filter(
          (profileItem: ProfileItemType) => profileItem.id !== action.payload.id,
        );
      },
      fetchProfileData: (
        state,
        action: {payload: ProfileItemType; type: string},
      ) => {
        
        state.profileData = state.profileData.concat(...state.profileData ,action.payload);
        //  console.log('identificationNumber---->>test',state.profileData)//
         state.isLoading = false
      },
      fetchProfileDataError: (
        state,
        action: {payload: boolean; type: string},
      ) => {
        state.isLoading = action.payload,
        state.isError = action.payload
      },
    },
});

const {createSignUp, updateProfile, deleteProfile,fetchProfileData,fetchProfileDataError,uploadImage} = signUpSlice.actions;

export const signUpAction = {
    createSignUp,
    updateProfile,
    deleteProfile,
    fetchProfileData,
    fetchProfileDataError,
    uploadImage
};

export default signUpSlice.reducer;