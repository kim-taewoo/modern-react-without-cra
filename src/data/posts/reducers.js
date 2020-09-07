import { combineReducers } from 'redux';
import * as ActionTypes from '@/data/rootActionTypes';

function entities(state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.RESET_POSTS:
      return {};

    case ActionTypes.APPEND_POSTS:
      return {
        ...state,
        ...Object.fromEntries(action.posts.map((p) => [p.id, p])),
      };

    case ActionTypes.PREPEND_POST:
      return {
        ...state,
        [action.post.id]: action.post,
      };

    case ActionTypes.MODIFY_POST:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          ...action.post,
        },
      };

    default:
      return state;
  }
}

function ids(state = [], action = {}) {
  switch (action.type) {
    case ActionTypes.RESET_POSTS:
      return [];

    case ActionTypes.APPEND_POSTS:
      return [...state, ...action.posts.map((p) => p.id)];

    case ActionTypes.PREPEND_POST:
      return [action.post.id, ...state];

    default:
      return state;
  }
}

function hasMorePosts(state = true, action = {}) {
  switch (action.type) {
    case ActionTypes.RESET_POSTS:
      return true;
    case ActionTypes.NO_MORE_POSTS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  entities,
  ids,
  hasMorePosts,
});
