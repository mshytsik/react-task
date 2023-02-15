import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import MultiSelect from "./MultiSelect";

describe("test MultiSelect component", () => {
  const multiselect = (
    <MultiSelect
      id="multiselect"
      label="Multiselect Label"
      allValues={["A", "B", "C", "D"]}
      selectedValues={["C", "D"]}
      callback={() => {}}
    />
  );

  test("component is rendered correctly", () => {
    const component = renderer.create(multiselect).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("check label text", () => {
    const { getByLabelText } = render(multiselect);
    const component = getByLabelText("Multiselect Label");
    expect(component).toBeInTheDocument();
  });

  test("selected values are checked", () => {
    const { container } = render(multiselect);
    const inputValues = container.querySelector("input").value;
    expect(["C", "D"].every((value) => inputValues.includes(value))).toBe(true);
  });
});
