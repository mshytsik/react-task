import React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { MultiSelect } from "../shared";

import "./RecipesFilter.scss";

const RecipesFilter = ({ filter, className }) => {
  const names = useSelector((state) => {
    const uniqueNames = new Set(
      state?.recipes?.list?.map((recipe) => recipe?.name)
    );
    return Array.from(uniqueNames);
  });

  const tags = useSelector((state) => {
    const allTags = state?.recipes?.list?.reduce(
      (tags, recipe) => tags?.concat(recipe?.tags),
      []
    );
    const uniqueTags = new Set(allTags);
    return Array.from(uniqueTags);
  });

  const countries = useSelector((state) => {
    const uniqueCountries = new Set(
      state?.recipes?.list?.map((recipe) => recipe?.country)
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
        selectedValues={filter.name[0]}
        callback={filter.name[1]}
      />

      <MultiSelect
        id="tags-checkbox"
        label="Tags"
        allValues={tags}
        selectedValues={filter.tag[0]}
        callback={filter.tag[1]}
      />

      <MultiSelect
        id="countries-checkbox"
        label="Countries"
        allValues={countries}
        selectedValues={filter.country[0]}
        callback={filter.country[1]}
      />
    </Box>
  );
};

export default RecipesFilter;
