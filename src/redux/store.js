import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slice/productSlice'
const store= configureStore({
reducer:{
products:productsReducer,
}
})
export default store;