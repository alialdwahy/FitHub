import {createSlice, nanoid} from '@reduxjs/toolkit';
import { LoginReponseItemType } from '../../types/genericTypes';
import EnrollStore from './enrollStore';



const initialState = EnrollStore;

export const enrollSlice = createSlice({
  name: 'enroll',
  initialState: {
    ...initialState,
    isLoading: true,
    isError: false,
  }, 
  reducers: {

    enrollsub: (
        state,
        action,

    ) =>{
        state = action.payload,
        state.isError = !action.payload.success;
        console.log('payment---->>test',action.payload)//
    },

   
  }, 
});

const {enrollsub} = enrollSlice.actions;

export const enrollAction = {
    enrollsub
};

export default enrollSlice.reducer;