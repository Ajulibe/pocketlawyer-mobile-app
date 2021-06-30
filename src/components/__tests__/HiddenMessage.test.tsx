import * as React from "react";
import renderer from "react-test-renderer";
import {render, fireEvent} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import Button from "screens/HiddenMessage";

//**dependecies used are from react-testing-library/react-native and jest-native */

it("renders correctly", () => {
  renderer.create(<Button>Login</Button>);
});

test("button has correct intial color", () => {
  const {getByRole} = render(<Button />);
  const element = getByRole("button");

  //--> you can test using thr JSON print of the component
  // const element = render(<Button />).toJSON();
  // console.log(render(<Button />).toJSON());

  //--> expect the background color to be red
  expect(element).toHaveStyle({
    backgroundColor: "red",
  });

  //--> click the button
  fireEvent.press(element);
  //--> expect the background color to turn blue
  expect(element).toHaveStyle({
    backgroundColor: "blue",
  });
  //--> expect the button text to change
  expect(element).toHaveTextContent("color changed");
});

it("gets the button", () => {
  const {getByA11yRole, getByA11yLabel} = render(<Button />);
  expect(getByA11yRole("button")).toBeDefined();
  expect(getByA11yLabel("upvote count")).toBeDefined();
});

test("button disabled on click", () => {
  const {getByRole} = render(<Button />);
  const button = getByRole("button");
  expect(button).toBeEnabled();
  fireEvent.press(button);
  expect(button).toBeDisabled();
});
