import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { MultiSelect } from "../shared";

import "./RecipesFilter.scss";

const RecipesFilter = ({ filter, className }) => {
  const names = useSelector((state) => {
    const uniqueNames = new Set(
      state.recipes.list.map((recipe) => recipe.name)
    );
    return Array.from(uniqueNames);
  });

  const tags = useSelector((state) => {
    const allTags = state.recipes.list.reduce(
      (tags, recipe) => tags.concat(recipe.tags),
      []
    );
    const uniqueTags = new Set(allTags);
    return Array.from(uniqueTags);
  });

  const countries = useSelector((state) => {
    const uniqueCountries = new Set(
      state.recipes.list.map((recipe) => recipe.country)
    );
    return Array.from(uniqueCountries);
  });

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={[...className.split(" "), "recipes-filter"]}
    >
      <MultiSelect
        id="names-checkbox"
        label="Names"
        allValues={names}
        selectedValues={filter.names}
        callback={filter.setNames}
      />

      <MultiSelect
        id="tags-checkbox"
        label="Tags"
        allValues={tags}
        selectedValues={filter.tags}
        callback={filter.setTags}
      />

      <MultiSelect
        id="countries-checkbox"
        label="Countries"
        allValues={countries}
        selectedValues={filter.countries}
        callback={filter.setCountries}
      />
    </Box>
  );
};

export default RecipesFilter;

RecipesFilter.propTypes = {
  filter: PropTypes.exact({
    names: PropTypes.arrayOf(PropTypes.string).isRequired,
    setNames: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTags: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    setCountries: PropTypes.func.isRequired,
  }),
  className: PropTypes.string.isRequired,
};

RecipesFilter.defaultProps = {
  className: "",
};
