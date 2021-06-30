import * as React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import Button, {ButtonProps} from "components/PLButton/PLButton.component";
import {ApplicationProvider} from "@ui-kitten/components";
import {light, mapping} from "@eva-design/eva";
import {TouchableOpacity} from "react-native";

//**dependecies used are from react-testing-library/react-native and jest-native */

describe("@PLButton: component checks", () => {
  const onPress = jest.fn();
  const TestButton = (props: ButtonProps) => (
    <ApplicationProvider mapping={mapping} theme={light}>
      <Button {...props} />
    </ApplicationProvider>
  );

  const {getByTestId} = render(
    <TestButton
      testID="normal-button"
      btnText="I Love PL"
      textColor="red"
      onClick={onPress}
    />,
  );

  it("should find the button via testId", () => {
    const testIdName = "normal-button";
    const componentButton = getByTestId(testIdName);
    expect(componentButton).toBeTruthy();
  });

  it("should render text passed to children", () => {
    const btnText = "I Love PL";
    const {getByText} = render(
      <TestButton
        testID="normal-button"
        btnText="I Love PL"
        textColor="red"
        onClick={onPress}
        disabled={true}
      />,
    );
    //--> under the hood, button returns a text
    //--> that is why we use getByText
    const foundButtonTitle = getByText(btnText);
    expect(foundButtonTitle).toHaveTextContent("I Love PL");
  });

  it("should show a disabled buttton if loading if true", () => {
    const {getByTestId} = render(
      <TestButton
        testID="normal-button"
        btnText="I Love PL"
        textColor="red"
        onClick={onPress}
        disabled={true}
      />,
    );
    //--> under the hood, button returns a text
    //--> that is why we use getByText
    const foundButtonTitle = getByTestId("normal-button");
    expect(foundButtonTitle).toBeDisabled();
  });

  it("should call onPress", () => {
    const onPress = jest.fn();
    const {UNSAFE_queryByType} = render(
      <TestButton
        testID="normal-button"
        btnText="I Love PL"
        textColor="red"
        onClick={onPress}
        disabled={true}
      />,
    );

    const component = UNSAFE_queryByType(TouchableOpacity);

    fireEvent.press(component);
    expect(onPress).toHaveBeenCalled();
  });

  it("should render accessoryLeft Prop", () => {
    const {getByTestId} = render(
      <TestButton
        testID="normal-button"
        btnText="I Love PL"
        textColor="red"
        onClick={onPress}
        disabled={true}
        isLoading={true}
      />,
    );
    const componentInput = getByTestId("normal-button");
    expect(componentInput).toHaveProp("style");
  });
});
