import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchUserDataFromAsyncStorage } from "./services/UserApi";

const MainContext = React.createContext({});

const MainProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [formToggle, setFormToggle] = useState(false);
  const [token, setToken] = useState("");

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
