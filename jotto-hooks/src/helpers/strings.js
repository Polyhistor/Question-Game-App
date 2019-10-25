const languageStrings = {
  en: {
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters"
  },
  emoji: {
    congrats: "🎯🎉",
    submit: "🚀",
    guessPrompt: "🤔🤫🔤",
    guessInputPlaceholder: "⌨️🤔",
    guessedWords: "🤷‍🔤",
    guessColumnHeader: "🤷‍",
    matchingLettersColumnHeader: "✅"
  }
};

const getStringByLanguage = (
  languageCode,
  stringKey,
  strings = languageStrings
) => {
  // if in strings object, the language code does not exist, or if the word in the language does not exist
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could no get string [${stringKey}] for [${languageCode}]`);

    return strings.en[stringKey];
  }
  return strings[languageCode][stringKey];
};

// for future mocking
export default {
  getStringByLanguage
};
