import React from "react";
import { useParams, useNavigate } from "react-router";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import recipesSlice, { remove } from "../../store/recipesReducer";

import RecipeRemove from "./RecipeRemove";

import recipe from "../stubs/stubRecipe";

const initialState = { list: [recipe] };

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("test RecipeRemove component", () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: "10" });
    useNavigate.mockImplementation(() => jest.fn());
    useDispatch.mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    useParams.mockClear();
    useNavigate.mockClear();
    useDispatch.mockClear();
  });

  test("is rendered", () => {
    const { container } = render(<RecipeRemove />);
    const component = container.getElementsByClassName("recipe-remove");
    expect(component).toHaveLength(1);
  });

  test("removes recipe from store", () => {
    const mockDispatch = jest.fn(() => recipesSlice(initialState, remove(10)));
    useDispatch.mockReturnValue(mockDispatch);

    render(<RecipeRemove />);
    const removeButton = screen.getByText("Remove Recipe");
    fireEvent.click(removeButton);

    const sliceAfterRemove = mockDispatch.mock.results[0].value;
    expect(sliceAfterRemove.list).toHaveLength(0);
  });

  test("has clear title", () => {
    const { getByText } = render(<RecipeRemove />);
    expect(getByText("Are you sure?")).toBeInTheDocument();
  });
});
