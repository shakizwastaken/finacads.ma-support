import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { AuthContext } from ".";
import { AuthState } from "./types";
import { api } from "@/utils/api";
import { User } from "@prisma/client";

export type AuthHandler = (params: {
  isAuthenticated: boolean;
  user: User | null | {};
}) => any;

export const defaultAuthHandler: AuthHandler = function handler({
  isAuthenticated,
}) {
  if (!isAuthenticated) Router.push("/auth/login");
  else {
    if (Router.pathname.startsWith("/auth")) {
      Router.push("/dashboard");
    }

    if (Router.pathname === "/") Router.push("/dashboard");
  }
};

export const useAuthProvider = (
  authHandler: AuthHandler = defaultAuthHandler
) => {
  const [loading, setLoading] = useState(true);

  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: {},
  });

  const { refetch: getUser, isLoading: requestLoading } =
    api.auth.getUser.useQuery(undefined, {
      onSuccess(value) {
        let user = value.user;
        if (user)
          setAuthState((state) => ({ ...state, isAuthenticated: true, user }));
        else
          setAuthState((state) => ({
            ...state,
            isAuthenticated: false,
            user: {},
          }));

        setLoading(false);
      },
      onError(err) {
        setLoading(false);
      },
      refetchInterval: 6000,
      refetchIntervalInBackground: true,
    });

  useEffect(() => {
    if (!loading) authHandler(authState);
  }, [loading]);

  return { loading, authState };
};

export const useAuth = () => useContext(AuthContext);

// export const useAuthCookie = () => {
//   const [] = useCookies(["token"]);
//   const clearToken = () => remove("token");
//   return [token, clearToken];
// };
