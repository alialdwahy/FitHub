/*
 * Copyright (c) 2023 {{copyrighter.author: @anugrahnathtiwari}}
 * All rights reserved.
 * {{copyrighter.note}}
 */

const APIENDPOINTS = {

   // baseurl
  PROD_BASEURL: "",
  // Api urls
  
  SESSION_DIGEST: 'auth/signIn', 
  SESSION_LOGOUT: 'auth/signOut', 
  SIGN_UP: 'auth/signUp',
  PROFILE: 'member/profile',
  UPDATE_PROFILE: 'member',
  DELETE_PROFILE: 'auth/user',
  UPLOAD_IMAGE: 'member',
  GET_CLASS: 'class-schedules',
  GET_CLASS_Details: 'class-schedule',
  CLASS_ENROLL: 'class-schedule/enroll'



};

export default APIENDPOINTS;