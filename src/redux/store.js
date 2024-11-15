import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slice/productSlice'
import usersReducer from './slice/usersSlice'
const store= configureStore({
reducer:{
products:productsReducer,
users: usersReducer,
}
})
export default store;