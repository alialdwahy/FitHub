import useClassViewModel from "../view-models/useClassViewModel"




const useClassController = () => {

const { getAllClassData, classData, classDetails, getClassDetails } = useClassViewModel();


// console.log("Fetched Profile Data:", classDetails);


return {
   
    classData,
    classDetails,

    getClassDetails,

    getAllClassData
   
  };

};

export default useClassController;