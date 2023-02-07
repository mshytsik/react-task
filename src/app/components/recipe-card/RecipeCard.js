import { Link } from "react-router-dom";
import "./RecipeCard.scss";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-card__body">
        {recipe?.name && (
          <Link to={`/recipe/${recipe?.id}`} className="recipe-card__name">
            {recipe.name}
          </Link>
        )}
        {recipe?.tags && (
          <p className="recipe-card__tags">
            Tags: <span>{recipe?.tags?.join(", ")}</span>
          </p>
        )}
        {recipe?.country && (
          <div className="recipe-card__country country">
            <p className="country__name">
              Recipe from <span>{recipe?.country}</span>
            </p>
            {recipe?.countryIcon && (
              <div
                className="country__icon"
                style={{ backgroundImage: `url(${recipe?.countryIcon})` }}
              />
            )}
          </div>
        )}
      </div>

      {recipe?.img && (
        <Link
          to={`/recipe/${recipe?.id}`}
          className="recipe-card__image"
          style={{ backgroundImage: `url(${recipe?.img})` }}
        ></Link>
      )}
    </div>
  );
};

export default RecipeCard;
