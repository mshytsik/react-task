import React, { useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipesReducer";

import RecipesFilter from "../recipes-filter/RecipesFilter";
import RecipesSearch from "../recipes-search/RecipesSearch";
import RecipeCard from "../recipe-card/RecipeCard";
import Collapse from "@mui/material/Collapse";

import "./Recipes.scss";

const Recipes = ({ showNav }) => {
  const [filterNames, setFilterNames] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("name");

  let recipes = useSelector(selectRecipes);

  const inNames = (recipe) =>
    !filterNames.length || filterNames.includes(recipe.name);

  const inTags = (recipe) =>
    !filterTags.length ||
    !recipe.tags.every((tag) => !filterTags.includes(tag));

  const inCountries = (recipe) =>
    !filterCountries.length || filterCountries.includes(recipe.country);

  const inSearch = (recipe) => {
    if (searchValue.length) {
      if (searchType === "name" || searchType === "country") {
        return recipe[searchType]
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      } else if (searchType === "tag") {
        return !recipe.tags.every(
          (tag) => !tag.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
    }
    return true;
  };

  recipes = recipes.filter(
    (recipe) =>
      inNames(recipe) &&
      inTags(recipe) &&
      inCountries(recipe) &&
      inSearch(recipe)
  );

  return (
    <div className="recipes">
      <Collapse in={showNav}>
        <nav className="recipes-nav">
          <RecipesFilter
            className="recipes-nav__item"
            filter={{
              names: filterNames,
              setNames: setFilterNames,
              tags: filterTags,
              setTags: setFilterTags,
              countries: filterCountries,
              setCountries: setFilterCountries,
            }}
          />

          <RecipesSearch
            className="recipes-nav__item"
            setValue={setSearchValue}
            type={searchType}
            setType={setSearchType}
          />
        </nav>
      </Collapse>

      {recipes.length ? (
        <div className="recipes__list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="recipes__notfound">No recipes found :(</div>
      )}
    </div>
  );
};

export default Recipes;

Recipes.propTypes = {
  showNav: PropTypes.bool.isRequired,
};
