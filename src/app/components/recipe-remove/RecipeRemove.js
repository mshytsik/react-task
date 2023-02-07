import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { remove } from "../../store/recipesReducer";

import { Button } from "../shared";

import "./RecipeRemove.scss";

const RecipeRemove = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchRemove = (recipe) => dispatch(remove(recipe));

  const handleSubmit = () => {
    dispatchRemove(Number(id));
    navigate("/");
  };

  return (
    <div className="recipe-remove">
      <p className="recipe-remove__title">Are you sure?</p>
      <Button callback={handleSubmit} size="large">
        Remove Recipe
      </Button>
    </div>
  );
};

export default RecipeRemove;
