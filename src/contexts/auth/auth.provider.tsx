import React, { useReducer } from "react";
import Cookie from "js-cookie";

import { AuthContext } from "./auth.context";
import { useCart } from "contexts/cart/use-cart";
const isBrowser = typeof window !== "undefined";
// const { rehydrateLocalState } = useCart();
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!localStorage.getItem("access_token"),
  currentForm: "signIn",
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        currentForm: "signIn",
      };
    case "SIGNIN_SUCCESS":
      // rehydrateLocalState({}, "login");
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    case "SIGNUP":
      return {
        ...state,
        currentForm: "signUp",
      };
    case "FORGOTPASS":
      return {
        ...state,
        currentForm: "forgotPass",
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
