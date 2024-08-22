import useUserViewModel from "../view-models/useUserViewModel"




const useUserController = () => {

const { profileData ,updateProfile, uploadImage, deleteProfile, getAllProfileData } = useUserViewModel();


// console.log("Fetched Profile Data:", profileData);


return {
   
    profileData,

    updateProfile,

    uploadImage,

    deleteProfile,

    getAllProfileData
   
  };

};

export default useUserController;