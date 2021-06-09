import { configureStore } from "@reduxjs/toolkit";
import bool from "./appReducers";

const store = configureStore({
  reducer: {
    bool,
  },
});
export default store;
