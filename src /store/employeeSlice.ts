import {createSlice, nanoid} from '@reduxjs/toolkit';
import EmployeeStore from './EmployeeStore';
import { EmployeesItemType } from '../types/genericTypes';



const initialState = EmployeeStore;

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    ...initialState,
    isLoading: true,
    isError: false,
  }, 
  reducers: {
    fetchEmployeesData: (
      state,
      action: {payload: EmployeesItemType; type: string},
    ) => {
      state.employeeData = state.employeeData.concat(action.payload);
       state.isLoading = false
    },
    fetchEmployeesDataError: (
      state,
      action: {payload: boolean; type: string},
    ) => {
      state.isLoading = action.payload,
      state.isError = action.payload
    },
  },
});

const {fetchEmployeesData, fetchEmployeesDataError} = employeeSlice.actions;

export const EmployeeAction = {
  fetchEmployeesData,
  fetchEmployeesDataError,
};

export default employeeSlice.reducer;