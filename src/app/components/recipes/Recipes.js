import React, { useState } from "react";
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

  recipes = recipes.filter((recipe) => {
    if (filterNames.length && !filterNames.includes(recipe?.name)) {
      return false;
    }

    if (
      filterTags.length &&
      recipe?.tags?.every((tag) => !filterTags.includes(tag))
    ) {
      return false;
    }

    if (filterCountries.length && !filterCountries.includes(recipe?.country)) {
      return false;
    }

    if (searchValue.length) {
      if (searchType === "name" || searchType === "country") {
        if (
          !recipe[searchType]
            ?.toLowerCase()
            .includes(searchValue?.toLowerCase())
        ) {
          return false;
        }
      } else if (searchType === "tag") {
        if (
          recipe?.tags?.every(
            (tag) => !tag.toLowerCase().includes(searchValue?.toLowerCase())
          )
        ) {
          return false;
        }
      }
    }

    return true;
  });

  return (
    <div className="recipes">
      <Collapse in={showNav}>
        <nav className="recipes-nav">
          <RecipesFilter
            className="recipes-nav__item"
            filter={{
              name: [filterNames, setFilterNames],
              tag: [filterTags, setFilterTags],
              country: [filterCountries, setFilterCountries],
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
