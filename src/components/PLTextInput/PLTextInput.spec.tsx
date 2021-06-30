import * as React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import PLTextInput, {Props} from "components/PLTextInput/PLTextInput.component";
import {ApplicationProvider} from "@ui-kitten/components";
import {light, mapping} from "@eva-design/eva";

//**dependecies used are from react-testing-library/react-native and jest-native */

describe("@PLInput: component checks", () => {
  const onChangeText = jest.fn();
  const TestInput = (props: Props) => (
    <ApplicationProvider mapping={mapping} theme={light}>
      <PLTextInput {...props} />
    </ApplicationProvider>
  );

  const {getByTestId} = render(
    <TestInput
      onChangeText={onChangeText}
      testID="inputCmp"
      textContentType="emailAddress"
      error={true}
    />,
  );

  it("should find the button via testId", () => {
    const testIdName = "inputCmp";
    const componentInput = getByTestId(testIdName);
    expect(componentInput).toBeTruthy();
  });

  it("should call onChangeText", () => {
    const {getByTestId} = render(
      <TestInput
        onChangeText={onChangeText}
        testID="inputCmp"
        textContentType="emailAddress"
      />,
    );

    const testIdName = "inputCmp";
    const componentInput = getByTestId(testIdName);
    // expect(componentInput).toContainElement(View);
    fireEvent.changeText(componentInput);
    expect(onChangeText).toHaveBeenCalled();
  });

  it("should call contain error prop", () => {
    const {getByTestId} = render(
      <TestInput
        onChangeText={onChangeText}
        testID="inputCmp"
        textContentType="emailAddress"
        error={true}
      />,
    );
    const testIdName = "inputCmp";
    const componentInput = getByTestId(testIdName);
    expect(componentInput).toHaveProp("error");
    // expect(componentInput).toContainElement(View);
  });

  it("should call contain maxLength prop", () => {
    const {getByTestId} = render(
      <TestInput
        onChangeText={onChangeText}
        testID="inputCmp"
        textContentType="emailAddress"
        error={true}
        maxLength={225}
      />,
    );
    const testIdName = "inputCmp";
    const componentInput = getByTestId(testIdName);
    expect(componentInput).toHaveProp("maxLength", 225);
    // expect(componentInput).toContainElement(View);
  });

  it("should call contain disabled prop", () => {
    const {getByTestId} = render(
      <TestInput
        onChangeText={onChangeText}
        testID="inputCmp"
        textContentType="emailAddress"
        error={true}
        disabled={true}
      />,
    );
    const testIdName = "inputCmp";
    const componentInput = getByTestId(testIdName);
    expect(componentInput).toHaveProp("disabled", true);
  });

  it("should render labelText Prop", () => {
    const {getByTestId} = render(
      <TestInput
        onChangeText={onChangeText}
        testID="inputCmp"
        textContentType="emailAddress"
        error={true}
        labelText="undefined"
      />,
    );
    const testIdName = "inputCmp";
    const componentInput = getByTestId(testIdName);
    expect(componentInput).toHaveProp("labelText", "undefined");
  });

  it("should render when labelText is required", () => {
    const component = render(
      <TestInput
        onChangeText={onChangeText}
        testID="inputCmp"
        textContentType="emailAddress"
        error={true}
        labelTextRequired={true}
        labelText="true"
      />,
    ).toJSON();

    expect(component?.children).toHaveLength(1);
  });
});
