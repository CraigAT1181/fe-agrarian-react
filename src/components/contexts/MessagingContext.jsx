import React, { createContext, useContext } from "react";

const MessagingContext = createContext();

export const useMessaging = () => useContext(MessagingContext);

export const MessagingProvider = ({ children }) => {
  return (
    <MessagingContext.Provider value={{}}>{children}</MessagingContext.Provider>
  );
};
