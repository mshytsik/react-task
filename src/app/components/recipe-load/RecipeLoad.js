import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectBase,
  getBaseGroups,
  getBaseRecipe,
} from "../../store/recipesReducer";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Collapse,
} from "@mui/material";
import { Button } from "../shared";

import "./RecipeLoad.scss";

const RecipeLoad = () => {
  let base = useSelector(selectBase);

  let [group, setGroup] = useState("random");
  let [category, setCategory] = useState("");
  let [ingredient, setIngredient] = useState("");
  let [country, setCountry] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBaseGroups());
  }, [dispatch]);

  useEffect(() => {
    if (base?.groups?.status === "loaded") {
      setCategory(base?.groups?.category[0]);
      setIngredient(base?.groups?.ingredient[0]);
      setCountry(base?.groups?.country[0]);
    }
  }, [base]);

  const handleChangeSelect = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = () => {
    const searchValue =
      group === "category"
        ? category
        : group === "ingredient"
        ? ingredient
        : group === "country"
        ? country
        : "";

    dispatch(getBaseRecipe({ group, searchValue }));
    navigate("/add?load");
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="recipe-load"
      onSubmit={handleSubmit}
    >
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <InputLabel>Search by</InputLabel>
        <Select
          value={group}
          label="Search by"
          onChange={(event) => handleChangeSelect(event, setGroup)}
        >
          <MenuItem value="random">Random meal</MenuItem>
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="ingredient">Ingredient</MenuItem>
          <MenuItem value="country">Country</MenuItem>
        </Select>
      </FormControl>

      {base?.groups?.status === "loaded" && (
        <>
          <Collapse in={group === "category"}>
            <FormControl fullWidth sx={{ mb: "20px" }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(event) => handleChangeSelect(event, setCategory)}
              >
                {base?.groups?.category?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Collapse>

          <Collapse in={group === "ingredient"}>
            <FormControl fullWidth sx={{ mb: "20px" }}>
              <InputLabel>Ingredient</InputLabel>
              <Select
                value={ingredient}
                label="Ingredient"
                onChange={(event) => handleChangeSelect(event, setIngredient)}
              >
                {base?.groups?.ingredient?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Collapse>

          <Collapse in={group === "country"}>
            <FormControl fullWidth sx={{ mb: "20px" }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                label="Country"
                onChange={(event) => handleChangeSelect(event, setCountry)}
              >
                {base?.groups?.country?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Collapse>
        </>
      )}

      <FormControl
        className="recipe-load__submit"
        fullWidth
        sx={{ mb: "20px" }}
      >
        <Button callback={handleSubmit} size="large">
          Load Recipe
        </Button>
      </FormControl>
    </Box>
  );
};

export default RecipeLoad;
