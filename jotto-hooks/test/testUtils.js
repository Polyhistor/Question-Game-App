import checkPropTypes from "check-prop-types";

/**
 * Return node(s) with the given data-test attribute
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper
 * @param {string} val - value of the element's data test arribute
 * @return {ShallowWrapper}
 */

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

/**
 * Return propError message if the conforim props do not match proptype validation
 * @function checkProps
 * @param {React.Component} component - component to check props against
 * @param {object} conforimgProps -props we expect to conform to defined proptypes
 *
 */

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
