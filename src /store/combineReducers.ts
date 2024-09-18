import { combineReducers } from 'redux';
import signUpReducer from './authentication/signupSlice'; // Adjust the path based on your structure
import loginReducer from './authentication/authSlice';
import classReducer from './class/classSlice';
import enrollReducer from './emrollment/enrollSlice'

const rootReducer = combineReducers({
    login: loginReducer,
    signUp: signUpReducer,
    classes:  classReducer,  
    enroll:  enrollReducer,
});

export default rootReducer;
