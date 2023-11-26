import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchUserDataFromAsyncStorage } from "./services/UserApi";

const MainContext = React.createContext({});

const MainProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [formToggle, setFormToggle] = useState(false);
  const [token, setToken] = useState("");
  const [handleChange, setHandleChange] = useState(false);

  useEffect(() => {
    fetchUserDataFromAsyncStorage(setUser);
  }, [isLoggedIn]);

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        formToggle,
        setFormToggle,
        token,
        setToken,
        handleChange,
        setHandleChange,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
