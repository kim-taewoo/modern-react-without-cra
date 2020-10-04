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
      // 중복된 포스트가 존재하지 않도록 필터링하기 위해서 Set 사용
      return [...new Set([...state, ...action.posts.map((p) => p.id)])];

    case ActionTypes.PREPEND_POST:
      return [action.post.id, ...state];

    default:
      return state;
  }
}

function offset(state = 0, action = {}) {
  switch (action.type) {
    case ActionTypes.SET_OFFSET:
      return action.offset;

    case ActionTypes.RESET_POSTS:
      return 0;

    default:
      return state;
  }
}

export default combineReducers({
  entities,
  ids,
  offset,
});
