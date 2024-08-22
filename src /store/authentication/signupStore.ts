import {nanoid} from '@reduxjs/toolkit';
import {SignUpStateTypes} from '../../types/signupStateTypes';

const SignUpStore: SignUpStateTypes = {
  fetchingProfile: false,
  signUp: [

  ],
  profileData:[

  ],
  uploadImage: [],



  creatingSignUp: false,
  createSignUpSuccess: false,
  createSignUpError: false,

  updatingProfile: false,
  updateProfileSuccess: false,
  updateProfileError: false,

  deletingProfile: false,
  deleteProfileSuccess: false,
  deleteProfileError: false,
};

export default SignUpStore;