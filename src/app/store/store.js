import { configureStore } from "@reduxjs/toolkit";

import recipesReducer from "./recipesReducer";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});
