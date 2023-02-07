import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import {
  selectRecipes,
  selectBase,
  add,
  edit,
} from "../../store/recipesReducer";

import { Box, FormControl } from "@mui/material";
import { Button, ControlTextField } from "../shared";

import "./RecipeForm.scss";

const RecipeForm = ({ action = "add" }) => {
  let { id } = useParams();
  let recipes = useSelector(selectRecipes);
  let base = useSelector(selectBase);

  const { search } = useLocation();
  const isLoad = new URLSearchParams(search).has("load");

  const [defaultRecipe, setDefaultRecipe] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchAdd = (recipe) => dispatch(add(recipe));
  const dispatchEdit = (recipe) => dispatch(edit(recipe));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      name: "",
      tags: "",
      country: "",
      countryIcon: "",
      ingredients: "",
      instructions: "",
      img: "",
      video: "",
    },
  });

  useEffect(() => {
    if (action === "edit") {
      setDefaultRecipe(recipes.find((item) => item?.id === Number(id)));
    } else if (isLoad) {
      setDefaultRecipe(base.recipe.value);
    }
  }, [action, recipes, id, isLoad, base.recipe.value]);

  useEffect(() => {
    const recipe = { ...defaultRecipe };
    recipe.tags = defaultRecipe?.tags?.join(", ");
    recipe.ingredients = defaultRecipe?.ingredients?.join(", ");
    recipe.instructions = defaultRecipe?.instructions?.join("\n");
    reset(recipe);
  }, [defaultRecipe, reset]);

  const onError = (errors) => {
    let errorElements = Object.keys(errors).map(
      (name) => document.getElementsByName(name)[0]
    );
    if (errorElements.length) {
      let errorElement = errorElements[0];
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      errorElement.focus({ preventScroll: true });
    }
  };

  const onSubmit = (data) => {
    const recipe = { ...data };
    recipe.tags = data?.tags?.split(", ");
    recipe.ingredients = data?.ingredients?.split(", ");
    recipe.instructions = data?.instructions
      ?.split("\n")
      .filter((line) => line.length);

    if (action === "edit") {
      recipe.id = Number(id);
    } else {
      while (true) {
        let newId = Math.floor(Math.random() * 900000) + 100000;
        if (!recipes.find((item) => item.id === newId)) {
          recipe.id = newId;
          break;
        }
      }
    }

    action === "edit" ? dispatchEdit(recipe) : dispatchAdd(recipe);
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="recipe-form"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <ControlTextField
        control={control}
        name="name"
        label="Name"
        isRequired
        maxLength={40}
        error={errors?.name ?? null}
      />

      <ControlTextField
        control={control}
        name="tags"
        label="Tags"
        isRequired
        maxLength={120}
        error={errors?.tags ?? null}
        helperText="Divide your tags with commas and spaces: ', '"
      />

      <ControlTextField
        control={control}
        name="country"
        label="Country"
        isRequired
        maxLength={40}
        error={errors?.country ?? null}
      />

      <ControlTextField
        control={control}
        name="countryIcon"
        label="Country Icon"
        maxLength={120}
        error={errors?.countryIcon ?? null}
      />

      <ControlTextField
        control={control}
        name="ingredients"
        label="Ingredients"
        isRequired
        maxLength={200}
        error={errors?.ingredients ?? null}
        helperText="Divide your ingredients with commas and spaces: ', '"
      />

      <ControlTextField
        control={control}
        name="instructions"
        label="Instructions"
        isRequired
        maxLength={2000}
        error={errors?.instructions ?? null}
        helperText="Start each your instruction from new line"
      />

      <ControlTextField
        control={control}
        name="img"
        label="Image link"
        maxLength={120}
        error={errors?.img ?? null}
      />

      <ControlTextField
        control={control}
        name="video"
        label="Video link"
        maxLength={120}
        error={errors?.video ?? null}
      />

      <FormControl
        className="recipe-form__submit"
        fullWidth
        sx={{ mb: "20px" }}
      >
        <Button callback={handleSubmit(onSubmit, onError)} size="large">
          {action === "add" ? "Add" : "Save"} Recipe
        </Button>
      </FormControl>
    </Box>
  );
};

export default RecipeForm;
