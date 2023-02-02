import { User } from "@prisma/client";

export enum ActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  ERROR = "ERROR",
  LOADING = "LOADING",
}

export interface ErrorAction {
  type: ActionTypes.ERROR;
  payload: string;
}

export interface LoginAction {
  type: ActionTypes.LOGIN;
  payload: User;
}

export interface LogoutAction {
  type: ActionTypes.LOGOUT;
}

export interface LoadingAction {
  type: ActionTypes.LOADING;
  payload: boolean;
}

export type AuthAction =
  | LoginAction
  | LogoutAction
  | ErrorAction
  | LoadingAction;

export interface LoginData {
  email: string;
  stayLoggedIn?: boolean;
}

export interface AuthState {
  user: User | null | {};
  isAuthenticated: boolean;
}

export interface AuthContextType {
  authState: AuthState;
  loading: boolean;
}
