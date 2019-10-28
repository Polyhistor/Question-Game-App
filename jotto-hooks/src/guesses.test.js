import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";

import guessedWordsContext from "./contexts/guessedWordsContext";
import successContext from "./contexts/successContext";
import Input from "./Input";
import GuessedWords from "./GuessedWords";

const setup = (guessedWordsStrings = [], secretWord = "party") => {
  const wrapper = mount(
    <guessedWordsContext.GuesseedWordProvider>
      <successContext.SuccesProvider>
        <Input secretWord={secretWord}></Input>
        <GuessedWords />
      </successContext.SuccesProvider>
    </guessedWordsContext.GuesseedWordProvider>
  );

  const inputBox = findByTestAttr(wrapper, "input-box");
  const submitButton = findByTestAttr(wrapper, "submit-button");

  // prepulating guessedwords context by simulating word guess
  guessedWordsStrings.map(word => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");
  });

  return [wrapper, inputBox, submitButton];
};

describe("test word guesses", () => {
  let wrapper;
  let inputBox;
  let submitButton;

  describe("non-empty guessWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(["agile"], "party");
    });

    describe("correct guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "party" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });

      test("input component contains no child", () => {
        const inputComponent = findByTestAttr(wrapper, "component-input");
        expect(inputComponent.children().length).toBe(0);
      });

      test("GuessedWords table row count refelcts updated guess", () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });

    describe("incorrect guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });

      test("input box remains", () => {
        expect(inputBox.exists()).toBe(true);
      });

      test("GuessedWords table row count refelcts updated guess", () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });

    describe("empty guesswords", () => {
      beforeEach(() => {
        [wrapper, inputBox, submitButton] = setup([], "party");
      });

      test("guessedWords shows correct guesses after incorrect guess", () => {
        const mockevent = { target: { value: "train" } };
        inputBox.simulate("change", mockevent);
        submitButton.simulate("click");
        const guessedWordsTableRows = findByTestAttr(wrapper, "guessed-words");
        expect(guessedWordsTableRows.length).toBe(1);
      });
    });
  });
});
