import { AuthContextType } from "./types";

import React, { PropsWithChildren, createContext } from "react";
import { useAuthProvider } from "./hooks";
import { BiLoaderCircle } from "react-icons/bi";

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

  if (value.loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center ">
        <BiLoaderCircle size={"38px"} className="animate-spin" />
      </div>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
