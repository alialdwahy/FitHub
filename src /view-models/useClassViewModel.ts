import { useDispatch, useSelector } from "react-redux";
import { ClassStateTypes, ClassStoreTypes } from "../types/classStateTypes";
import { classAction } from "../store/class/classSlice";
import { useEffect } from "react";
import ServiceMaster from "../api/networkApi/ServiceMaster";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useClassViewModel = () => {
  const dispatch = useDispatch();
  const classData = useSelector((state: ClassStoreTypes) => state.classes.classData);
  const classDetails = useSelector((state: ClassStoreTypes) => state.classes.classDetail);
  
  const { fetchClassData, fetchClassDataError, clearClassData, fetchClassDetails, fetchClassDetailsError } = classAction;



    const getAllClassData = async () => {
      try {

        dispatch(clearClassData());

        const res = await ServiceMaster.getClass();
        // console.log("API Response:", res);

        if (res && Array.isArray(res[1]) && res[1].length > 0) {
          const classes = res[1].map(item => ({
            id: item.id ? item.id.toString() : 'Unknown ID',
            description: item.fitnessClass?.description || '',
            images: item.fitnessClass?.images?.[0]?.url || '',
            name: item.fitnessClass?.name || 'Unknown Name',
            price: item.price?.toString() || 'Unknown Price',
          }));
    
          // Optionally, store the first item's ID in AsyncStorage
          if (res[1][0].id) {
            await AsyncStorage.setItem('class_id', res[1][0].id.toString());
          }
    
          // console.log('Profile Object to Dispatch:', classes);
         // Dispatch each class individually
      classes.forEach(singleClass => {
        dispatch(fetchClassData(singleClass));
      });
        } else {
          dispatch(fetchClassDataError(true));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        dispatch(fetchClassDataError(true));
      }
    };
    useEffect(() => {
    getAllClassData();
  }, [dispatch, fetchClassData, fetchClassDataError]);
    
  

  const getClassDetails = async (id: string) => {
    try {

     

      const res = await ServiceMaster.getClassDetails(id);
console.log("Full API Response Details:", res);  // Log the entire response

           if (res && res[1]) { // Check if res[1] exists
              const classDetails = res[1]; // No 'data' field; use res[1] directly

              const classDetail = {
                id: classDetails.id.toString(),
                teachername: classDetails.instructor?.name ?? "N/A",  // Fallback if instructor is missing
                name: classDetails.fitnessClass?.name ?? "N/A",
                description: classDetails.fitnessClass?.description ?? "No description available",
                price: classDetails.price ?? 0,
                startDate: classDetails.startDate ?? "Not available",
                endDate: classDetails.endDate ?? "Not available",
                images: classDetails.fitnessClass?.images?.[0]?.url ?? "No image available",
              };
        console.log("Class Details fetched:", classDetail); // Log the fetched class details
        // await AsyncStorage.setItem('class_detail_id',classDetails.id.toString())
        // console.log('Profile Object to Dispatch:', profile);
        dispatch(fetchClassDetails(classDetail));
      } else {
        dispatch(fetchClassDetailsError(true));
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      dispatch(fetchClassDetailsError(true));
    }
  };

  // useEffect(() => {
  //   getClassDetails(id);
  // }, [dispatch, fetchClassDetails, fetchClassDetailsError]);
    

  


  return {
    classDetails,
    classData,

    getAllClassData,
    getClassDetails,

  }
  
};

export default useClassViewModel;
