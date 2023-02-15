import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import ControlTextField from "./ControlTextField";
import { useForm } from "react-hook-form";

describe("test ControlTextField component", () => {
  const Component = () => {
    const { control } = useForm();
    return (
      <ControlTextField
        control={control}
        name="textfield"
        label="Control Textfield"
      />
    );
  };

  test("component is rendered correctly", () => {
    const component = renderer.create(<Component />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("check label text", () => {
    const { getByLabelText } = render(<Component />);
    const component = getByLabelText("Control Textfield");
    expect(component).toBeInTheDocument();
  });

  test("no helper text by default", () => {
    const { container } = render(<Component />);
    const component = container.getElementsByClassName(
      "MuiFormHelperText-root"
    );
    expect(component).toHaveLength(0);
  });
});
