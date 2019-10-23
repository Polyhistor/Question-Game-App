import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./input";

/**
 * function that creates an enzyme shallow dom with input component
 * @function setup
 * @returns {ShallowWrapper}
 */

const setup = (secretWord = "party") =>
  shallow(<Input secretWord={secretWord} />);

describe("Input", () => {
  it("should be mounted without any errors", () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, "component-input");
    expect(input.length).toBe(1);
  });

  it("on correct props, should not give any warnings", () => {
    checkProps(Input, { secretWord: "party" });
  });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    //overriding react useState
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  });

  it("updates with value input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  it("is submmited with an empty string", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    // we need prevent default to be passed from the test
    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
