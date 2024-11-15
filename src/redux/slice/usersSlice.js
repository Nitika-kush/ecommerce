import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 const initialState={
  users:[],
  status:"idle",
  error:null,
 }
 export const fetchUsersData=createAsyncThunk(
  "users/fetchUserData",
  ()=>{
    const response= fetch('http://localhost:3000/users');
    console.log(response);
    if(!response.ok){
      throw error ;
    }
    const user=response.json();
    return user;
  }
 )
const usersSlice=createSlice({
name:"users",
initialState,
reducers:{
setUser(state,action){
  state.users=action.payload;
},
addUser(state,action){
state.users.push(action.payload);
},
},
extraReducers:(builder)=>{
  builder
  .addCase(
    fetchUsersData.pending,(state)=>{
      state.status="pending";
    }
  )
  .addCase(
    fetchUsersData.fulfilled,(state,action)=>{
      state.status='fulfilled'
      state.users=action.payload
    }
  )
  .addCase(
    fetchUsersData.rejected,(state)=>{
      state.error='rejected'
    }
  )
}

})
export const { setUser, addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;