import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../test-utils/providersRenderer";

import RecipeCard from "./RecipeCard";

import recipe from "../stubs/stubRecipe";

describe("test RecipeCard component", () => {
  test("is rendered", () => {
    const { container } = renderWithProviders(<RecipeCard recipe={recipe} />);
    const card = container.getElementsByClassName("recipe-card");
    expect(card).toHaveLength(1);
  });

  test("image is not rendered if empty", () => {
    const { container } = renderWithProviders(<RecipeCard recipe={recipe} />);
    const image = container.getElementsByClassName("recipe-card__image");
    expect(image).toHaveLength(0);
  });

  test("has link on name element", () => {
    const { container } = renderWithProviders(<RecipeCard recipe={recipe} />);
    const name = container.getElementsByClassName("recipe-card__name")[0];
    expect(name.tagName).toEqual("A");
  });
});
