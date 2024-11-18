import { createSlice } from '@reduxjs/toolkit';
let storedCart = [];
if(JSON.parse(localStorage.getItem('cart'))){
  storedCart=JSON.parse(localStorage.getItem('cart')).items
}
console.log(storedCart,">>>")
const initialState = {
  cart: storedCart, // Use saved cart data
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      console.log( state.cart)
      
      const exists = state.cart.some(item => item.id === product.id);
      if (!exists) {
        state.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(state.cart)); 
      }
    },
   
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(state.cart)); // 
    },
    setCart(state, action) {
      state.items = action.payload;
    },
  }
});

export const { addToCart, removeFromCart,setCart } = cartSlice.actions;
export default cartSlice.reducer;
