import React from "react";
import {
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import "./RecipesSearch.scss";

const RecipesSearch = ({ value, setValue, type, setType, className }) => {
  const handleChangeValue = (event) => setValue(event.target.value);

  const handleChangeType = (event) => setType(event.target.value);

  const handleSubmit = (event) => event.preventDefault();

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={[...className.split(" "), "recipes-search"]}
      onSubmit={handleSubmit}
    >
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <TextField
          id="search-input"
          label="Search"
          value={value}
          onChange={handleChangeValue}
          size="small"
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Search in</FormLabel>
        <RadioGroup
          row
          id="search-type"
          value={type}
          onChange={handleChangeType}
        >
          <FormControlLabel value="name" control={<Radio />} label="Names" />
          <FormControlLabel value="tag" control={<Radio />} label="Tags" />
          <FormControlLabel
            value="country"
            control={<Radio />}
            label="Countries"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default RecipesSearch;
