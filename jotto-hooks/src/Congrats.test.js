import React from "react";
import { mount } from "enzyme";

import { findByTestAttr } from "../test/testUtils";
import Congrats from "./Congrats";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";

/**
 * Factory function to create a ReactWrapper for the Congrats component.
 * @function setup
 * @param {object} testValues - contextValues specific to this setup.
 * @returns {ReactWrapper}
 */
const setup = ({ success, language }) => {
  language = language || "en";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccesProvider value={[success, jest.fn()]}>
        <Congrats success={success} />
      </successContext.SuccesProvider>
    </languageContext.Provider>
  );
};

describe("languagePicker", () => {
  test("correctly renders congrats string in English by default", () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
  });

  test("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe("🎯🎉");
  });
});
