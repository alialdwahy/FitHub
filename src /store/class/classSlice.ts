import {createSlice} from '@reduxjs/toolkit';
import ClassStore from './classStore';
import { ClassDetailsItemType, ClassItemType } from '../../types/genericTypes';



const initialState = ClassStore;

export const classSlice = createSlice({
  name: 'classes',
  initialState: {
    ...initialState,
    isLoading: true,
    isError: false,

  }, 
  reducers: {
  
      fetchClassData: (
        state,
        action: {payload: ClassItemType; type: string},
      ) => {
        
        state.classData = [ ...state.classData, action.payload];
        state.isLoading = false;
      },
      fetchClassDataError: (
        state,
        action: { payload: boolean; type: string },
      ) => {
        state.isLoading = action.payload;
        state.isError = action.payload;
      },
      clearClassData: (state) => {
        state.classData = []; // Clear class data
      },

      fetchClassDetails: (
        state,
        action: {payload: ClassDetailsItemType; type: string},
      ) => {
        
        state.classDetail = state.classDetail.concat(...state.classDetail ,action.payload);
         console.log('identificationNumber---->>test',state.classDetail)//
         state.isLoading = false
      },
      fetchClassDetailsError: (
        state,
        action: {payload: boolean; type: string},
      ) => {
        state.isLoading = action.payload,
        state.isError = action.payload
      },
    },
});

const {fetchClassData,fetchClassDataError,clearClassData, fetchClassDetails, fetchClassDetailsError} = classSlice.actions;

export const classAction = {
    fetchClassData,
    fetchClassDataError,
    clearClassData,
    fetchClassDetails,
    fetchClassDetailsError
};

export default classSlice.reducer;