    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
            console.log("RTK", item);
          } else {
            console.log("Product is already in cart");
          }
        },
        removeItemFromCart: (state, action) => {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        removeItemFromWishlist: (state, action) => {
          state.wishlist = state.wishlist.filter(
            (item) => item.id !== action.payload
          );
        },
      },
    });

    export const {
      loggedUser,
      removeItemFromCart,
      addItemToCart,
    } = usersSlice.actions;
    export default usersSlice.reducer;
