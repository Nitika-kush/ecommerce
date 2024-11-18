import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  // status: 'idle',  
  // error: null
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch("http://localhost:3000/users");
   const data=await response.json(); 
   return data;
  }
);
export const addToCartAsync=createAsyncThunk(
  'users/addToCart',
  async({userId,item})=>{
    const response=await fetch(`http://localhost:3000/users/${userId}`);
    const user= await response.json();
    const updatedUser={
      ...user,cart:[...(user.cart || []),item]
    };


    await fetch(`http://localhost:3000/users/${userId}`,{
      method: "PATCH",
      headers : {
        "Context-Type":"application/json",
      },
      body : JSON.stringify({cart:updatedUser.cart})
    });
    return updateUser;
  }
);
const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   addToCart :(state, action)=>{
    const userIndex = state.users.findIndex(user=>
      user.id===action.payload.userId);
      if(userIndex!==-1){
        state.users[userIndex]={
          ...state.users[userIndex],
          cart: [...(state.users[userIndex],cart || []), action.payload.item]
        };
      }
   },
    // updateUser(state, action) {
    //   const index = state.users.findIndex(user => user.id === action.payload.id);
    //   if (index !== -1) {
    //     state.users[index] = action.payload;
    //   }
    // },
    // deleteUser(state, action) {
    //   state.users = state.users.filter(user => user.id !== action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.users = [];
      });
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users =[ ...action.payload];
      });
      builder.addCase(fetchUsers.rejected, (state) => {
        state.users = [];
      });
  },
});

export const { setUser, addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;

