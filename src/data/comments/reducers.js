import * as ActionTypes from '@/data/rootActionTypes';

export default function comments(state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.APPEND_COMMENTS:
      return {
        ...state,
        [action.postId]: action.comments,
      };

    case ActionTypes.PREPEND_COMMENT:
      return {
        ...state,
        [action.postId]: [action.comment, ...(state[action.postId] || [])],
      };

    default:
      return state;
  }
}
