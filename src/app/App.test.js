import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "./test-utils/providersRenderer";

import App from "./App";

describe("test App component", () => {
  beforeEach(() => {
    Element.prototype.scrollTo = () => {};
  });

  afterEach(() => {
    Element.prototype.scrollTo = null;
  });

  test("component is rendered", () => {
    const { getByTestId } = renderWithProviders(<App />);
    const app = getByTestId("app");
    expect(app).toBeInTheDocument();
  });

  test("both header menus are rendered", () => {
    const { container } = renderWithProviders(<App />);
    const menus = container.getElementsByClassName("header__menu");
    expect(menus).toHaveLength(2);
  });

  test("main is rendered", () => {
    const { container } = renderWithProviders(<App />);
    const main = container.getElementsByClassName("recipe-book__body");
    expect(main).toHaveLength(1);
  });
});
