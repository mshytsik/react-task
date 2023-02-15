import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useSelector } from "react-redux";

import Recipes from "./Recipes";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("test Recipes component", () => {
  beforeEach(() => {
    useSelector.mockReturnValue([]);
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  test("is rendered", () => {
    const { container } = render(<Recipes showNav={true} />);
    const recipes = container.getElementsByClassName("recipes");
    expect(recipes).toHaveLength(1);
  });

  test("show error message if empty recipes list", () => {
    const { getByText } = render(<Recipes showNav={true} />);
    const notFound = getByText("No recipes found :(");
    expect(notFound).toBeInTheDocument();
  });

  test("filters are hidden", () => {
    const { container } = render(<Recipes showNav={false} />);
    const filterClasslist = container.querySelector(
      ".recipes > .MuiCollapse-root"
    ).classList;
    expect(filterClasslist).toContain("MuiCollapse-hidden");
  });
});
