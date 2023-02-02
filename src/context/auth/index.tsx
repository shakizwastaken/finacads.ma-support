import { AuthContextType } from "./types";

import React, { PropsWithChildren, createContext } from "react";
import { useAuthProvider } from "./hooks";

export const initialAuthState = {
  isAuthenticated: false,
  user: {},
};

export const initialContextstate = {
  authState: initialAuthState,
  loading: true,
};

export const AuthContext = createContext<AuthContextType>(initialContextstate);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const value = useAuthProvider();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
