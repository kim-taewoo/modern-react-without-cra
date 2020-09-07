import { combineReducers } from 'redux';
import * as ActionTypes from '@/data/rootActionTypes';

function profile(state = null, action = {}) {
  switch (action.type) {
    case ActionTypes.SET_AUTH:
      return action.user;

    case ActionTypes.RESET_AUTH:
      return null;

    default:
      return state;
  }
}

function token(state = null, action = {}) {
  switch (action.type) {
    case ActionTypes.SET_AUTH:
      return action.token;

    case ActionTypes.RESET_AUTH:
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  profile,
  token,
});
