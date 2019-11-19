import React, { useState, useContext, useEffect} from "react";

export const RootContext = React.createContext();

export const RootContextProvider =  ({ children }) => {
    const prevAuth = localStorage.getItem('isAuthenticated') || false;
    const prevAuthBody = localStorage.getItem('accesstoken') || null;
    const [isAuthenticated, setAuthenticated] = useState(prevAuth);
    const [accesstoken, setaccesstoken] = useState(prevAuthBody);
    const [loader, setloader] = useState(false);
    const [snackopen, setsnackopen] = useState([false,'']);
    useEffect(
      () => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
        localStorage.setItem('accesstoken', accesstoken);
      },
      [isAuthenticated, accesstoken]
    );
    const defaultContext = {
        isAuthenticated,
        setAuthenticated,
        accesstoken,
        setaccesstoken,
        loader,
        setloader,
        snackopen,
        setsnackopen,
    };
    return (
      <RootContext.Provider value={defaultContext}>
        {children}
      </RootContext.Provider>
    );
  };

export const useAuthDataContext = () => useContext(RootContext);