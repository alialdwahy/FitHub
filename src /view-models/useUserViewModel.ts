import { useDispatch, useSelector } from "react-redux";
import { ProfileStateTypes, StoreType } from "../types/signupStateTypes";
import { signUpAction } from "../store/authentication/signupSlice";
import { useEffect } from "react";
import ServiceMaster from "../api/networkApi/ServiceMaster";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserViewModel = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state: StoreType) => state.signUp.profileData);

  const { fetchProfileData, fetchProfileDataError, updateProfile,  deleteProfile } = signUpAction;

  useEffect(() => {
    const getAllProfileData = async () => {
      try {
        const res = await ServiceMaster.getProfileData();
        console.log("API Response:", res);

        if (res && res[1]?.success) {
          const profileData = res[1]?.data;

          const profile = {
            id: profileData.id,
            identificationNumber: profileData.identificationNumber,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            gender: profileData.gender,
            email: profileData.email,
            phone: profileData.phone,
            profilePicture: profileData.profilePicture?.url,
            name: profileData.firstName + ' ' + profileData.lastName,
            username: profileData?.createdBy?.username || 'unknown'
          };
          
          // console.log('Profile Object to Dispatch:', profile);
          dispatch(fetchProfileData(profile));
        } else {
          dispatch(fetchProfileDataError(true));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        dispatch(fetchProfileDataError(true));
      }
    };

    getAllProfileData();
  }, [dispatch, fetchProfileData, fetchProfileDataError]);
    



  return {
    profileData,

  //   updateProfile: (payload: {id: string; firstName: string,  lastName: string; gender: string, email: string; phone: number,name: string; username: string, identificationNumber:string,profilePicture:string }) =>
  //     dispatch(updateProfile(payload)),
  //   updateProfile,
  //   updateProfileSuccess,
  //   updateProfileError,
  };
  
};

export default useUserViewModel;
