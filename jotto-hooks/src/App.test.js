import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

/**
 * setup function of the tests for app component
 * @function setup
 * @return {ShallowWrapper}
 */
const setup = () => {
  return shallow(<App />);
};

test("renders without crashing", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});
