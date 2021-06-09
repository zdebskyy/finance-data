import appActions from "./appActions";
import { createReducer } from "@reduxjs/toolkit";

const bool = createReducer(true, {
  [appActions.toggler]: (state, { _ }) => {
    return !state;
  },
});

export default bool;
