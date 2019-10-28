import React from "react";

const guessedWordContext = React.createContext();

const useGuessedWords = () => {
  const context = React.useContext(guessedWordContext);

  if (!context) {
    throw new Error(
      "useGuessedwords must be used within a GuesseedWordProvider"
    );
  }

  return context;
};

const GuesseedWordProvider = props => {
  const [guessedWords, setGuessedWords] = React.useState([]);

  const value = React.useMemo(() => [guessedWords, setGuessedWords], [
    guessedWords
  ]);

  return <guessedWordContext.Provider value={value} {...props} />;
};

export default { GuesseedWordProvider, useGuessedWords };
