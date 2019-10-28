import React from "react";

const successContext = React.createContext();

/**
 * @function useSucces
 * @returns {Array} successContext value, which is a state of [value, setter]
 */
const useSuccess = () => {
  const context = React.useContext(successContext);

  if (!context) {
    throw new Error("useSuccess must be used within a succes provider");
  }

  return context;
};

/**
 * @function succesProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */

const SuccesProvider = props => {
  const [success, setSuccess] = React.useState(false);

  const value = React.useMemo(() => [success, setSuccess], [success]);

  return <successContext.Provider value={value} {...props} />;
};

export default { SuccesProvider, useSuccess };
