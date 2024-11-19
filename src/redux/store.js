import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productData from "./slice/productSlice";
import userData from "./slice/usersSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  product: productData,
  users: userData,
});

const persistConfig = {
  key: 'Root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
/* export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
 */
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);