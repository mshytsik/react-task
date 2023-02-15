import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import RecipesSearch from "./RecipesSearch";

describe("test RecipesSearch component", () => {
  test("is rendered", () => {
    const { container } = render(
      <RecipesSearch type="name" setValue={() => {}} setType={() => {}} />
    );
    const component = container.getElementsByClassName("recipes-search");
    expect(component).toHaveLength(1);
  });

  test("search type radio group contains all three radios", () => {
    render(
      <RecipesSearch type="name" setValue={() => {}} setType={() => {}} />
    );
    const group = document.getElementById("search-type");
    expect(group.children).toHaveLength(3);
  });

  test("extra class name is added correctly", () => {
    const { container } = render(
      <RecipesSearch
        type="name"
        setValue={() => {}}
        setType={() => {}}
        className="extra-class"
      />
    );
    const component = container.getElementsByClassName("recipes-search")[0];
    expect(component.classList).toContain("extra-class");
  });
});
