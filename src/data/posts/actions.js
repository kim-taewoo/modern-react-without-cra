import * as ActionTypes from '@/data/rootActionTypes';

export function writePost(contents) {
  return {
    type: ActionTypes.WRITE_POST,
    contents,
  };
}

export function getPosts(offset = 0, limit = 5) {
  return {
    type: ActionTypes.GET_POSTS,
    offset,
    limit,
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

export function noMorePosts() {
  return {
    type: ActionTypes.NO_MORE_POSTS,
  };
}

export function getUserPosts(userId, offset = 0, limit = 5) {
  return {
    type: ActionTypes.GET_USER_POSTS,
    userId,
    offset,
    limit,
  };
}

export function resetPosts() {
  return {
    type: ActionTypes.RESET_POSTS,
  };
}
