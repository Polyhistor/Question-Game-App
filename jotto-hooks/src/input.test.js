import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./input";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

/**
 * function that creates an enzyme shallow dom with input component
 * @param {object} testValues - Context and props values for this specific test
 * @function setup
 * @returns {ShallowWrapper}
 */

const setup = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccesProvider value={[success, jest.fn()]}>
        <guessedWordsContext.GuesseedWordProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuesseedWordProvider>
      </successContext.SuccesProvider>
    </languageContext.Provider>
  );
};

describe("Input", () => {
  it("should be mounted without any errors", () => {
    const wrapper = setup({});
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
    wrapper = setup({});
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

describe("languagePicker", () => {
  test("correctly renders submit string in English", () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });
  test("correctly renders congrats strings in emojit", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});

test("input component is empty when success is true", () => {
  const wrapper = setup({ secretWord: "party", success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
