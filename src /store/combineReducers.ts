import { combineReducers } from 'redux';
import signUpReducer from './authentication/signupSlice'; // Adjust the path based on your structure
import loginReducer from './authentication/authSlice'

const rootReducer = combineReducers({
    login: loginReducer,
    signUp: signUpReducer,   // Ensure this matches the key you're using in `useSelector`
});

export default rootReducer;
