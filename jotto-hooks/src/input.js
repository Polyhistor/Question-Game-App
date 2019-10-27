import React from "react";
import propTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

const Input = props => {
  // we do not destruct hooks because they break our tests yo!
  const [currentGuess, setCurrentGuess] = React.useState("");

  const language = React.useContext(languageContext);

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
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
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: propTypes.string.isRequired
};

export default Input;
