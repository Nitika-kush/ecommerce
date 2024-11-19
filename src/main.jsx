import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
       <PersistGate persistor={persistor} >
       <App />
       </PersistGate>
       
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
