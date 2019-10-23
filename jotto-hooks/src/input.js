import React from "react";
import propTypes from "prop-types";

const Input = props => {
  // we do not destruct hooks because they break our tests yo!
  const [currentGuess, setCurrentGuess] = React.useState("");

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          onChange={e => setCurrentGuess(e.target.value)}
        ></input>
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={evt => {
            evt.preventDefault();
            setCurrentGuess("");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: propTypes.string.isRequired
};

export default Input;
