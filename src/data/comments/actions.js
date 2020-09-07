import * as ActionTypes from '@/data/rootActionTypes';

export function writeComment(postId, contents) {
  return {
    type: ActionTypes.WRITE_COMMENT,
    postId,
    contents,
  };
}

export function getComments(postId) {
  return {
    type: ActionTypes.GET_COMMENTS,
    postId,
  };
}

export function prependComment(postId, comment) {
  return {
    type: ActionTypes.PREPEND_COMMENT,
    postId,
    comment,
  };
}

export function appendComments(postId, comments) {
  return {
    type: ActionTypes.APPEND_COMMENTS,
    postId,
    comments,
  };
}
