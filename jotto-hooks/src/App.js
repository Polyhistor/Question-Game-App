import React from "react";

import "./App.css";

import hookAction from "./actions/hookAction";
import languageContext from "./contexts/languageContext";
import LanguagePicker from "./LanguagePicker";
import Input from "./input";

/**
 * Reducer from react to update the state, called automatically by dispatch
 * @param {object} state - existing state
 * @param {object} action - contains 'type' and 'payload' properties for the state update
 * for example: {type: "setSecretWord", payload: "party"}
 * @return {object} - new state
 */

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

// setting the initial state
const initialState = { secretWord: null, language: "en" };

const App = () => {
  // our reducer
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // our dispatch
  const setSecretWord = secretWord =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  // our second dispatch
  const setLanguage = language =>
    dispatch({ type: "setLanguage", payload: language });

  // Running our function on mount
  React.useEffect(() => {
    hookAction.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Input secretWord={state.secretWord}></Input>
      </languageContext.Provider>
    </div>
  );
};

export default App;
