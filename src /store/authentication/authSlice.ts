import {createSlice, nanoid} from '@reduxjs/toolkit';
import LoginStore from './AuthStore';
import { LoginReponseItemType } from '../../types/genericTypes';



const initialState = LoginStore;

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    ...initialState,
    isLoading: true,
    isError: false,
  }, 
  reducers: {

    getSessionDigestData: (
        state,
        action: {payload: LoginReponseItemType; type: string}

    ) =>{
        state.loginData = action.payload,
        state.isError = !action.payload.success;
    }
  }, 
});

const {getSessionDigestData} = loginSlice.actions;

export const loginAction = {
    getSessionDigestData,
};

export default loginSlice.reducer;