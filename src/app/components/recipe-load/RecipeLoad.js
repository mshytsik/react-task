import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectBase,
  getBaseGroup,
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
    if (base.groups.category.status === "loaded") {
      setCategory(base.groups.category.list[0]);
    }
  }, [base.groups.category]);

  useEffect(() => {
    if (base.groups.ingredient.status === "loaded") {
      setIngredient(base.groups.ingredient.list[0]);
    }
  }, [base.groups.ingredient]);

  useEffect(() => {
    if (base.groups.country.status === "loaded") {
      setCountry(base.groups.country.list[0]);
    }
  }, [base.groups.country]);

  const handleChangeGroupSelect = (event, callback) =>
    callback(event.target.value);

  const handleChangeGroup = (event) => {
    const groupValue = event.target.value;
    setGroup(groupValue);

    if (
      groupValue !== "random" &&
      base.groups[groupValue].status !== "loaded"
    ) {
      dispatch(getBaseGroup(groupValue));
    }
  };

  const handleSubmit = () => {
    if (group === "random" || base.groups[group].status === "loaded") {
      let searchValue;
      switch (group) {
        case "category":
          searchValue = category;
          break;
        case "ingredient":
          searchValue = ingredient;
          break;
        case "country":
          searchValue = country;
          break;
        default:
          searchValue = "";
      }

      dispatch(getBaseRecipe({ group, searchValue }));
      navigate("/add?load");
    }
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
          data-testid="search-type"
          onChange={(event) => handleChangeGroup(event)}
        >
          <MenuItem value="random">Random meal</MenuItem>
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="ingredient">Ingredient</MenuItem>
          <MenuItem value="country">Country</MenuItem>
        </Select>
      </FormControl>

      {base.groups.category.status === "loaded" && (
        <Collapse in={group === "category"}>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(event) => handleChangeGroupSelect(event, setCategory)}
            >
              {base.groups.category.list.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Collapse>
      )}

      {base.groups.ingredient.status === "loaded" && (
        <Collapse in={group === "ingredient"}>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <InputLabel>Ingredient</InputLabel>
            <Select
              value={ingredient}
              label="Ingredient"
              onChange={(event) =>
                handleChangeGroupSelect(event, setIngredient)
              }
            >
              {base.groups.ingredient.list.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Collapse>
      )}

      {base.groups.country.status === "loaded" && (
        <Collapse in={group === "country"}>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              label="Country"
              onChange={(event) => handleChangeGroupSelect(event, setCountry)}
            >
              {base.groups.country.list.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Collapse>
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
