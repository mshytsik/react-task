import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

const mockCallback = jest.fn(() => "Say hi!");

describe("test Button component", () => {
  test("component is rendered correctly", () => {
    const component = renderer.create(<Button>Click me</Button>).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("callback works correctly", () => {
    render(<Button callback={mockCallback}>Click me</Button>);
    const button = screen.getByText("Click me");
    fireEvent.click(button);
    expect(mockCallback.mock.results[0].value).toBe("Say hi!");
  });

  test("check medium size by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("MuiButton-sizeMedium");
  });
});
