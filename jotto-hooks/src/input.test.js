import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import Input from "./input";

/**
 * function that creates an enzyme shallow dom with input component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<Input />);

describe("Input", () => {
  it("should be mounted without any errors", () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, "component-input");
    expect(input.length).toBe(1);
  });
});
