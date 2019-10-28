import React from "react";
import propTypes from "prop-types";

import guessedWordsContext from "./contexts/guessedWordsContext";
import successContext from "./contexts/successContext";
import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";
import { getLetterMatchCount } from "./helpers";
import GuessedWords from "./GuessedWords";

const Input = ({ secretWord }) => {
  // we do not destruct hooks because they break our tests yo!
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) {
    return null;
  }

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

            const letterMatchCount = getLetterMatchCount(
              currentGuess,
              secretWord
            );

            const newGuessedWords = [
              ...guessedWords,
              { guessedWord: currentGuess, letterMatchCount: letterMatchCount }
            ];

            setGuessedWords(newGuessedWords);

            if (currentGuess === secretWord) {
              setSuccess(true);
            }

            setCurrentGuess("");
          }}
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

export default Input;
