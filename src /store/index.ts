import {configureStore} from '@reduxjs/toolkit';
import loginReducer from "./authentication/AuthStore";
import signUpReducer from './authentication/signupStore'

import rootReducer from './combineReducers';  // Import rootReducer from where combineReducers is defined

const store = configureStore({
  reducer: rootReducer,
});
 
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



export default store;