    import { createSlice} from "@reduxjs/toolkit";
    const initialState = {
      id: "",
      name: "",
      email: "",
      cart: [],
      wishlist: [],
      status: "idle",
      error: null,
    };

    const usersSlice = createSlice({
      name: "users",
      initialState,
      reducers: {
        loggedUser: (state, action) => {
          const { id, email, cart, wishlist, name } = action.payload;
          state.id = id;
          state.name = name;
          state.email = email;
          state.cart = cart;
          state.wishlist = wishlist;
        },
        addItemToCart: (state, action) => {
          const item = action.payload;
          const existingItem = state.cart.find((product) => product.id === item.id);
          if (!existingItem) {
            state.cart.push(item);
            console.log("Product added in cart", item);
          } else {
            console.log("Product is already in cart");
          }
        },
        removeItemFromCart: (state, action) => {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
          console.log("Item is Deleted from Cart");
        },
        removeItemFromWishlist : (state,action)=>{
          state.wishlist=state.wishlist.filter((item)=> item.id !==action.payload);
          console.log("Item is Deleted from Wishlist")
        },
      
        toggleItemToWishlist :(state,action)=>{
          const item=action.payload;
          const existingItem =state.wishlist.find((product)=> product.id===item.id);
          if(!existingItem){
            state.wishlist.push(item);
            console.log("product is added to wishlist")
          }
          else{
            state.wishlist=state.wishlist.filter((product)=> product.id !==item.id);
            console.log("Product is already in Wishlist ,removed from wishlist");
          }
        },
      },
    });

    export const {loggedUser,addItemToCart,
      removeItemFromCart,toggleItemToWishlist,
      removeItemFromWishlist} = usersSlice.actions;
    export default usersSlice.reducer;
