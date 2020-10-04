import * as ActionTypes from '@/data/rootActionTypes';

export function login(email, password, returnUrl) {
  return {
    type: ActionTypes.LOGIN,
    email,
    password,
    returnUrl,
  };
}

export function logout() {
  return {
    type: ActionTypes.LOGOUT,
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
