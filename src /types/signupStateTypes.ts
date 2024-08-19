import { ProfileItemType, SignUpItemType } from "./genericTypes";

export type SignUpStateTypes = {
  fetchingProfile: boolean;
  signUp: Array<SignUpItemType>;
  profileData: Array<ProfileItemType>;

  creatingSignUp: boolean;
  createSignUpSuccess: boolean;
  createSignUpError: boolean;

  updatingProfile: boolean;
  updateProfileSuccess: boolean;
  updateProfileError: boolean;

  deletingProfile: boolean;
  deleteProfileSuccess: boolean;
  deleteProfileError: boolean;
};

export type ProfileStateTypes = {
  fetchingProfile: boolean;
  profileData: Array<ProfileItemType>;

  creatingSignUp: boolean;
  createSignUpSuccess: boolean;
  createSignUpError: boolean;

  updatingProfile: boolean;
  updateProfileSuccess: boolean;
  updateProfileError: boolean;

  deletingProfile: boolean;
  deleteProfileSuccess: boolean;
  deleteProfileError: boolean;
};
export type StoreType = {
    signUp: SignUpStateTypes;
    profile: ProfileStateTypes;
};