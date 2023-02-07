import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGroups } from "../api/recipes/groups";
import { fetchRecipe } from "../api/recipes/recipe";

import { getStorageList } from "../utils/storage";

const initialState = {
  list: getStorageList("recipes"),
  base: {
    groups: {
      category: [],
      ingredient: [],
      country: [],
      status: "empty",
    },
    recipe: {
      value: {},
      status: "idle",
    },
  },
};

export const selectRecipes = (state) => state.recipes.list;

export const selectBase = (state) => state.recipes.base;

export const getBaseGroups = createAsyncThunk(
  "recipes/base/getGroups",
  fetchGroups
);

export const getBaseRecipe = createAsyncThunk(
  "recipes/base/getRecipe",
  (params) => fetchRecipe(params)
);

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    add: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
    edit: (state, action) => {
      state.list = state.list.map((recipe) =>
        recipe.id === action.payload.id ? action.payload : recipe
      );
    },
    remove: (state, action) => {
      state.list = state.list.filter((recipe) => recipe.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBaseGroups.pending, (state) => {
        state.base.groups.status = "loading";
      })
      .addCase(getBaseGroups.fulfilled, (state, action) => {
        state.base.groups = action.payload;
        state.base.groups.status = "loaded";
      })
      .addCase(getBaseRecipe.pending, (state) => {
        state.base.recipe.status = "loading";
      })
      .addCase(getBaseRecipe.fulfilled, (state, action) => {
        state.base.recipe.value = action.payload;
        state.base.recipe.status = "idle";
      });
  },
});

export const { add, edit, remove } = recipesSlice.actions;

export default recipesSlice.reducer;
