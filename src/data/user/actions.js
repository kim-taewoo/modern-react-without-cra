import * as ActionTypes from '@/data/rootActionTypes';

export function login(email, password) {
  return {
    type: ActionTypes.LOGIN,
    email,
    password,
  };
}

export function logout() {
  return {
    type: ActionTypes.LOGOUT,
  };
}

export function checkToken() {
  return {
    type: ActionTypes.CHECK_TOKEN,
  };
}

export function signup(email, name, file, password) {
  return {
    type: ActionTypes.SIGNUP,
    email,
    name,
    file,
    password,
  };
}

export function setAuth(token, user) {
  return {
    type: ActionTypes.SET_AUTH,
    token,
    user,
  };
}

export function resetAuth() {
  return {
    type: ActionTypes.RESET_AUTH,
  };
}
