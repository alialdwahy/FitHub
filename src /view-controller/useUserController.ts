import useUserViewModel from "../view-models/useUserViewModel"




const useUserController = () => {

const { profileData } = useUserViewModel();


// console.log("Fetched Profile Data:", profileData);


return {
   
    profileData
   
  };

};

export default useUserController;