/* import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slice/productSlice'
import usersReducer from './slice/usersSlice'
const store= configureStore({
reducer:{
products:productsReducer,
users: usersReducer,
}
})
export default store; */

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slice/productSlice';
import cartReducer from './slice/cartSlice'; 

const store = configureStore({
  reducer: {
    products: productsReducer, 
    cart: cartReducer,
  },
});

export default store;
