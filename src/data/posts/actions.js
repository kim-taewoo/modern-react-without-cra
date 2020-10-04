import * as ActionTypes from '@/data/rootActionTypes';

export function writePost(contents) {
  return {
    type: ActionTypes.WRITE_POST,
    contents,
  };
}

export function getPosts() {
  return {
    type: ActionTypes.GET_POSTS
  };
}

export function likePost(postId) {
  return {
    type: ActionTypes.LIKE_POST,
    postId,
  };
}

export function prependPost(post) {
  return {
    type: ActionTypes.PREPEND_POST,
    post,
  };
}

export function appendPosts(posts) {
  return {
    type: ActionTypes.APPEND_POSTS,
    posts,
  };
}

export function modifyPost(post) {
  return {
    type: ActionTypes.MODIFY_POST,
    post,
  };
}

export function setOffset(offset) {
  return {
    type: ActionTypes.SET_OFFSET,
    offset,
  };
}

export function resetPosts() {
  return {
    type: ActionTypes.RESET_POSTS,
  };
}
