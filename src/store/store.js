import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import appReducer from "./app/appSlice";
import userReducer from "./user/userSlice";
import productReducer from "./product/productSlice";
import configReducer from "./config/configSlice";
import blogReducer from "./blog/blogSlice";

const commonConfig = {
  key: "shop/user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token", "current", "currentCart"],
};
export const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
    user: persistReducer(userConfig, userReducer),
    config: configReducer,
    blog: blogReducer,
  },
});

export const persistor = persistStore(store);
