import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import Recipe from "./Recipe";

import recipe from "../stubs/stubRecipe";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("test Recipe component", () => {
  beforeEach(() => {
    useSelector.mockImplementation(() => [recipe]);
    useParams.mockReturnValue({ id: "10" });
  });

  afterEach(() => {
    useSelector.mockClear();
    useParams.mockClear();
  });

  test("is rendered", () => {
    const { container } = render(<Recipe />);
    const recipe = container.getElementsByClassName("recipe");
    expect(recipe).toHaveLength(1);
  });

  test("has correct name", () => {
    const { container } = render(<Recipe />);
    const recipeName = container.getElementsByClassName("recipe__name")[0];
    expect(recipeName).toHaveTextContent(recipe.name);
  });

  test("country icon is not rendered if empty", () => {
    const { container } = render(<Recipe />);
    const recipeIcon = container.getElementsByClassName("country__icon");
    expect(recipeIcon).toHaveLength(0);
  });
});
