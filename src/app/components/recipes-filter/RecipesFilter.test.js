import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { renderWithProviders } from "../../test-utils/providersRenderer";

import RecipesFilter from "./RecipesFilter";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

import filter from "../stubs/stubFilter";

describe("test RecipesFilter component", () => {
  beforeEach(() => {
    useSelector
      .mockReturnValue(["Name #1", "Name #2", "Name #3"])
      .mockReturnValue(["Tag #1", "Tag #2", "Tag #3"])
      .mockReturnValue(["Country #1", "Country #2", "Country #3"]);
  });

  test("is rendered", () => {
    const { container } = render(<RecipesFilter filter={filter} />);
    const component = container.getElementsByClassName("recipes-filter");
    expect(component).toHaveLength(1);
  });

  test("all three selects are rendered", () => {
    const { container } = renderWithProviders(
      <RecipesFilter filter={filter} />
    );
    const component = container.getElementsByClassName("recipes-filter")[0];
    expect(component.children).toHaveLength(3);
  });

  test("extra class name is added correctly", () => {
    const { container } = renderWithProviders(
      <RecipesFilter filter={filter} className="extra-class" />
    );
    const component = container.getElementsByClassName("recipes-filter")[0];
    expect(component.classList).toContain("extra-class");
  });
});
