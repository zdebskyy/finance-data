import { createAction } from "@reduxjs/toolkit";

const toggler = createAction("toggle/success");

const appActions = { toggler };

export default appActions;
