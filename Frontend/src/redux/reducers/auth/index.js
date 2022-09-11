import {createSlice} from "@reduxjs/toolkit";

 const authSlice = createSlice({
 name:"auth",
 initialState:{
     token:localStorage.getItem("token")||"",
     isLoggedIn:localStorage.getItem("token")?true:false,
     users:[]
 },
 reducers:{
     login:(state,action)=>{
         state.token=action.payload;
         localStorage.setItem('token',action.payload);
         state.isLoggedIn=true;
         localStorage.setItem('isLoggedIn',true);

     },
     logout:(state,action)=>{
         localStorage.clear();
         state.token="";
         state.isLoggedIn=false;
     },
     setUsers: (state, action) => {
        state.users = action.payload;
      },
 }


})

export const {login,logout,setUsers} = authSlice.actions;

export default authSlice.reducer;