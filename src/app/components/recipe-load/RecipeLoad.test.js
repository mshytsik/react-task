import React from "react";
import { useNavigate } from "react-router";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/providersRenderer";
import { useSelector, useDispatch } from "react-redux";
import recipesSlice, {
  getBaseGroup,
  getBaseRecipe,
} from "../../store/recipesReducer";

import RecipeLoad from "./RecipeLoad";

import recipe from "../stubs/stubRecipe";
import initialState from "../stubs/stubInitialBase";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("test RecipeLoad component", () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => jest.fn());
    useDispatch.mockImplementation(() => jest.fn());
    useSelector.mockReturnValue(initialState.base);
  });

  afterEach(() => {
    useNavigate.mockClear();
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  test("is rendered", () => {
    const { container } = renderWithProviders(<RecipeLoad />);
    const component = container.getElementsByClassName("recipe-load");
    expect(component).toHaveLength(1);
  });

  test("load groups on search type change", async () => {
    const mockDispatch = jest.fn(() =>
      recipesSlice(
        initialState,
        getBaseGroup.fulfilled({
          group: "category",
          values: ["Category #1", "Category #2"],
        })
      )
    );
    useDispatch.mockReturnValue(mockDispatch);

    const { getByTestId } = renderWithProviders(<RecipeLoad />);
    const categoryOption = getByTestId("search-type").querySelector("input");
    fireEvent.input(categoryOption, {
      target: { value: "category" },
    });

    const sliceAfterChange = mockDispatch.mock.results[0].value;
    expect(sliceAfterChange.base.groups.category.list).toHaveLength(2);
  });

  test("loads random recipe to store", async () => {
    const mockDispatch = jest.fn(() =>
      recipesSlice(
        initialState,
        getBaseRecipe.fulfilled({ ...recipe, name: "Random name", id: null })
      )
    );
    useDispatch.mockReturnValue(mockDispatch);

    const { getByText } = renderWithProviders(<RecipeLoad />);
    const loadButton = getByText("Load Recipe");
    fireEvent.click(loadButton);

    const sliceAfterLoad = mockDispatch.mock.results[0].value;
    expect(sliceAfterLoad.base.recipe.value.name).toEqual("Random name");
  });
});
