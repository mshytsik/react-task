import React from "react";
import { useParams, useNavigate } from "react-router";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderWithProviders } from "../../test-utils/providersRenderer";
import { useSelector, useDispatch } from "react-redux";
import recipesSlice, { add, edit } from "../../store/recipesReducer";

import RecipeForm from "./RecipeForm";

import recipe from "../stubs/stubRecipe";

const initialState = {
  list: [recipe],
  base: {
    groups: {},
    recipe: {
      value: {},
      status: "idle",
    },
  },
};

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("test RecipeRemove component", () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: "10" });
    useNavigate.mockImplementation(() => jest.fn());
    useDispatch.mockImplementation(() => jest.fn());
    useSelector
      .mockReturnValueOnce(initialState.list)
      .mockReturnValueOnce(initialState.base)
      .mockReturnValueOnce(initialState.list)
      .mockReturnValueOnce(initialState.base)
      .mockReturnValueOnce(initialState.list)
      .mockReturnValueOnce(initialState.base)
      .mockReturnValueOnce(initialState.list)
      .mockReturnValueOnce(initialState.base);
  });

  afterEach(() => {
    useParams.mockClear();
    useNavigate.mockClear();
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  test("is rendered", () => {
    const { container } = renderWithProviders(<RecipeForm action="add" />);
    const component = container.getElementsByClassName("recipe-form");
    expect(component).toHaveLength(1);
  });

  test("adds recipe to store", async () => {
    const mockDispatch = jest.fn(() =>
      recipesSlice(initialState, add({ ...recipe, id: 11 }))
    );
    useDispatch.mockReturnValue(mockDispatch);

    renderWithProviders(<RecipeForm action="add" />);
    const addButton = screen.getByText("Add Recipe");

    await act(async () => {
      fireEvent.input(document.getElementsByName("name")[0], {
        target: { value: "Recipe name" },
      });

      fireEvent.input(document.getElementsByName("tags")[0], {
        target: { value: "Tag#1, Tag #2" },
      });

      fireEvent.input(document.getElementsByName("country")[0], {
        target: { value: "Sweden" },
      });

      fireEvent.input(document.getElementsByName("ingredients")[0], {
        target: { value: "Ingredient #1, Ingredient #2" },
      });

      fireEvent.input(document.getElementsByName("instructions")[0], {
        target: { value: "Instructions" },
      });

      fireEvent.click(addButton);
    });

    const sliceAfterAdd = mockDispatch.mock.results[0].value;
    expect(sliceAfterAdd.list).toHaveLength(2);
  });

  test("edit name of existing recipe", async () => {
    const mockDispatch = jest.fn(() =>
      recipesSlice(initialState, edit({ ...recipe, name: "New name" }))
    );
    useDispatch.mockReturnValue(mockDispatch);

    renderWithProviders(<RecipeForm action="edit" />);
    const addButton = screen.getByText("Save Recipe");

    await act(async () => {
      fireEvent.input(document.getElementsByName("name")[0], {
        target: { value: "New name" },
      });

      fireEvent.click(addButton);
    });

    const sliceAfterSave = mockDispatch.mock.results[0].value;
    expect(sliceAfterSave.list[0].name).toEqual("New name");
  });
});
