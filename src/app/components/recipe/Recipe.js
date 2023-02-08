import React from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipesReducer";

import "./Recipe.scss";

const Recipe = () => {
  let { id } = useParams();
  let recipes = useSelector(selectRecipes);
  const recipe = recipes.find((recipe) => recipe.id === Number(id));

  return (
    <div className="recipe">
      <div className="recipe__head recipe-head">
        <div className="recipe-head__meta">
          {recipe.name && <p className="recipe__name">{recipe.name}</p>}

          {recipe.tags && (
            <p className="recipe__list">
              Tags: <span>{recipe.tags.join(", ")}</span>
            </p>
          )}

          {recipe.country && (
            <div className="recipe__country country">
              <p className="country__name">
                Recipe from <span>{recipe.country}</span>
              </p>
              {recipe.countryIcon && (
                <div
                  className="country__icon"
                  style={{ backgroundImage: `url(${recipe.countryIcon})` }}
                />
              )}
            </div>
          )}

          {recipe.ingredients && (
            <p className="recipe__list">
              Ingredients: <span>{recipe.ingredients.join(", ")}</span>
            </p>
          )}
        </div>

        {recipe.img && (
          <img className="recipe__image" src={recipe.img} alt={recipe.name} />
        )}
      </div>

      <div className="recipe__body">
        {recipe.instructions && (
          <>
            <p className="recipe__subtitle">Instructions</p>
            <div className="recipe__instructions instructions">
              {recipe.instructions.map((item, index) => {
                return (
                  <p className="instructions__step" key={index}>
                    <span>{`${index + 1}.`}</span>
                    {item}
                  </p>
                );
              })}
            </div>
          </>
        )}

        {recipe.video && (
          <>
            <p className="recipe__subtitle">Video</p>
            <div className="recipe__video">
              <iframe
                src={recipe.video}
                allow="autoplay; fullscreen; picture-in-picture"
                title="Video"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recipe;
