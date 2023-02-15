import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Error from "./Error";

describe("test Error component", () => {
  test("is rendered correctly", () => {
    const component = renderer.create(<Error />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("error message is correct", () => {
    const { getByText } = render(<Error />);
    const component = getByText("Oops, there is no page here!");
    expect(component).toBeInTheDocument();
  });

  test("has error class", () => {
    const { container } = render(<Error />);
    const component = container.getElementsByClassName("error-text");
    expect(component).toHaveLength(1);
  });
});
