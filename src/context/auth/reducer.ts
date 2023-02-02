import { User } from "@prisma/client";
import { Reducer } from "react";
import { ActionTypes, AuthAction, AuthState } from "./types";

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      const data = {} as User;
      return {
        ...state,
        isAuthenticated: true,
        user: data,
        loading: false,
        error: null,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
      };

    case ActionTypes.ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export default authReducer;
